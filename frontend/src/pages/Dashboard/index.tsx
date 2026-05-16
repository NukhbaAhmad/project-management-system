import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/api/dashboardService";
import {
  InProgressIcon,
  PendingIcon,
  CompletedIcon,
  ProjectsIcon,
  TasksIcon,
} from "@/icons";

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: dashboardService.GET_STATS,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-red-500">
          Failed to load stats. Please try again later.
        </div>
      </div>
    );
  }

  const stats = data!;

  const cards = [
    {
      title: "Total Projects",
      value: stats.total_projects,
      icon: <ProjectsIcon className="text-blue-500" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    {
      title: "Total Tasks",
      value: stats.total_tasks,
      icon: <TasksIcon className="text-purple-500" />,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
    },
    {
      title: "Completed Tasks",
      value: stats.completed_tasks,
      icon: <CompletedIcon className="text-green-500" />,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
    },
    {
      title: "Pending Tasks",
      value: stats.pending_tasks,
      icon: <PendingIcon className="text-yellow-500" />,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
    },
    {
      title: "In Progress Tasks",
      value: stats.inprogress_tasks,
      icon: <InProgressIcon className="text-orange-500" />,
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`${card.bgColor} rounded-2xl shadow-md border ${card.borderColor} p-6 transition-transform hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-full bg-white/50">{card.icon}</div>
              </div>
              <p className="text-gray-600 text-md font-semibold tracking-wide">
                {card.title}
              </p>
              <p className={`text-3xl font-bold ${card.textColor} mt-2`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
