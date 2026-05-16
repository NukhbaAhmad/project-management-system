const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
const { paginate, toJSON, doesIdExists } = require("./plugins");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User first name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      private: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds created, updated At
    strict: true, // No extra fields allowed
  }
);
userSchema.plugin(paginate);
userSchema.plugin(toJSON);
userSchema.plugin(doesIdExists);

userSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const query = { username };
  if (excludeUserId) {
    query._id = { $ne: excludeUserId };
  }
  const userFound = await this.findOne(query);
  return !!userFound;
};

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const query = { email };
  if (excludeUserId) {
    query._id = { $ne: excludeUserId };
  }
  const userFoundByEmail = await this.findOne(query);
  return !!userFoundByEmail;
};

userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;
  user.password = await bcrypt.hash(user.password, 10);
});

userSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function () {
    const Project = require("./project.model");
    const Task = require("./task.model");
    const userId = this.getFilter()._id;
    const projects = await Project.find({ created_by: userId });
    const projectIds = projects.map((p) => p._id);
    await Task.deleteMany({ project_id: { $in: projectIds } });
    await Project.deleteMany({ created_by: userId });
  }
);
const User = model("User", userSchema);
module.exports = User;
