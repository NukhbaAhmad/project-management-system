const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ApiError } = require("#utils");
const httpStatus = require("http-status");
const { paginate, toJSON, doesIdExists } = require("./plugins");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    is_trashed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
projectSchema.index({ title: 1, createdBy: 1, is_trashed: 1 });
projectSchema.plugin(paginate);
projectSchema.plugin(toJSON);
projectSchema.plugin(doesIdExists);

// For active projects only
projectSchema.statics.isTitleTaken = async function (
  title,
  userId,
  excludeProjectId = null
) {
  const query = {
    createdBy: userId,
    title: { $regex: new RegExp(`^${title}$`, "i") },
    is_trashed: false,
  };
  if (excludeProjectId) {
    query._id = { $ne: excludeProjectId };
  }
  const project = await this.findOne(query);
  return !!project;
};

// Only enforce uniqueness for ACTIVE projects
projectSchema.pre("save", async function () {
  const project = this;
  if (project.is_trashed) return;

  const conflict = await project.constructor.isTitleTaken(
    project.title,
    project.createdBy,
    project._id
  );

  if (conflict) {
    const error = new Error(
      `You already have an active project titled "${this.title}". Please choose a different title.`
    );
    error.statusCode = 400;
    throw error;
  }
});

projectSchema.index(
  { createdBy: 1, title: 1, is_trashed: 1 },
  { unique: true, partialFilterExpression: { is_trashed: false } }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
