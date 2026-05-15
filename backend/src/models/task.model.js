const mongoose = require("mongoose");
const { Schema } = mongoose;
const { paginate, toJSON, doesIdExists } = require("./plugins");

const taskSchema = new Schema(
  {
    projectId: {
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
taskSchema.index({ projectId: 1, is_trashed: 1, status: 1 });
taskSchema.index({ createdBy: 1, is_trashed: 1 });

// Plugins
taskSchema.plugin(paginate);
taskSchema.plugin(toJSON);
taskSchema.plugin(doesIdExists);

// Check if user owns the task's project
taskSchema.statics.isUserTask = async function (taskId, userId) {
  const task = await this.findById(taskId).populate("projectId");
  if (!task) return false;
  return task.projectId.createdBy.toString() === userId.toString();
};

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
