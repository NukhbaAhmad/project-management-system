const { status: httpStatus } = require("http-status");
const { dashboardServices } = require("#services");
const { catchAsync, sendResponse } = require("#utils");

const getDashboard = catchAsync(async (req, res) => {
  const summary = await dashboardServices.getDashboardSummary(req.user.id);
  sendResponse(res, httpStatus.OK, { data: summary });
});

module.exports = { getDashboard };
