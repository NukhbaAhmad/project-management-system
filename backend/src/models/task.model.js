const mongoose = require("mongoose");
const { Schema } = mongoose;
const { paginate, toJSON, doesIdExists } = require("./plugins");

const taskSchema = new Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project ID is required"],
    },
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
      index: true,
    },
    is_trashed: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true, strict: true }
);

// Compound index for common queries
taskSchema.index({ project_id: 1, is_trashed: 1, status: 1 });
taskSchema.index({ created_by: 1, is_trashed: 1 });

// Plugins
taskSchema.plugin(paginate);
taskSchema.plugin(toJSON);
taskSchema.plugin(doesIdExists);

// Check if user owns the task's project
taskSchema.statics.isUserTask = async function (task_id, userId) {
  const task = await this.findById(task_id).populate("project_id");
  if (!task) return false;
  return task.project_id.created_by.toString() === userId.toString();
};

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
