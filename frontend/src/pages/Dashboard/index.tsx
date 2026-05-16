import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/api/dashboardService";
import {
  InProgressIcon,
  PendingIcon,
  CompletedIcon,
  ProjectsIcon,
  TasksIcon,
} from "@/icons";
import LoadingSpinner from "@/components/loader";
import NoData from "@/components/noData/NoData";

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: dashboardService.GET_STATS,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0d1321]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
        <NoData />
    );
  }

  const stats = data!;

  const cards = [
    {
      title: "Total Projects",
      value: stats.total_projects,
      icon: <ProjectsIcon className="text-blue-400 w-5 h-5" />,
      iconBg: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-500",
    },
    {
      title: "Total Tasks",
      value: stats.total_tasks,
      icon: <TasksIcon className="text-purple-400 w-5 h-5" />,
      iconBg: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      textColor: "text-purple-500",
    },
    {
      title: "Completed Tasks",
      value: stats.completed_tasks,
      icon: <CompletedIcon className="text-green-400 w-5 h-5" />,
      iconBg: "bg-green-500/10",
      borderColor: "border-green-500/20",
      textColor: "text-green-500",
    },
    {
      title: "Pending Tasks",
      value: stats.pending_tasks,
      icon: <PendingIcon className="text-yellow-400 w-5 h-5" />,
      iconBg: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      textColor: "text-yellow-500",
    },
    {
      title: "In Progress Tasks",
      value: stats.inprogress_tasks,
      icon: <InProgressIcon className="text-orange-400 w-5 h-5" />,
      iconBg: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      textColor: "text-orange-500",
    },
  ];

  return (
    <div className="w-full bg-[#0d1321] text-[#e2e8f0]">
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-[#111827] flex justify-between items-center rounded-2xl border ${card.borderColor} p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30`}
          >
            <div>
              <p className="text-[#94a3b8] text-sm font-semibold tracking-wide">
                {card.title}
              </p>

              <p
                className={`text-4xl font-extrabod ${card.textColor} mt-2 tracking-tight`}
              >
                {card.value}
              </p>
            </div>{" "}
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-2.5 rounded-xl ${card.iconBg} flex items-center justify-center`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
