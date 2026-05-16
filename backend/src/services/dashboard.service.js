const { status: httpStatus } = require("http-status");
const { Project, Task } = require("#models");
const { ApiError } = require("#utils");

const getDashboardSummary = async (user_id) => {
  const total_projects = await Project.countDocuments({ created_by: user_id });
  const total_tasks = await Task.countDocuments({ created_by: user_id });
  const completed_tasks = await Task.countDocuments({
    created_by: user_id,
    status: "completed",
  });
  const pending_tasks = await Task.countDocuments({
    created_by: user_id,
    status: "pending",
  });
  const inprogress_tasks = await Task.countDocuments({
    created_by: user_id,
    status: "in_progress",
  });

  return {
    total_projects,
    total_tasks,
    completed_tasks,
    pending_tasks,
    inprogress_tasks,
  };
};

module.exports = { getDashboardSummary };
