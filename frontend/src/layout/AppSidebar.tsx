import { useCallback } from "react";
import { Link, useLocation } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import { DashboardIcon } from "@/icons";
import ProjectIcon from "@/icons/ProjectIcon";
import TaskIcon from "@/icons/TaskIcon";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const isSidebarOpen = isExpanded || isHovered || isMobileOpen;

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: <DashboardIcon />,
    },
    {
      label: "Projects",
      path: "/projects",
      icon: <ProjectIcon />,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: <TaskIcon />,
    },
  ];

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-[#111827] border-r border-[#1f2937] text-[#e2e8f0] h-screen transition-all duration-300 ease-in-out z-50 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
              ? "w-[290px]"
              : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar mt-6">
        <nav className="mb-6">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`menu-item group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 ${
                    isActive(item.path)
                      ? "menu-item-active bg-[#1e293b] text-[#5865f2] font-medium"
                      : "menu-item-inactive text-[#94a3b8] hover:bg-[#1e293b]/50 hover:text-[#e2e8f0]"
                  } ${!isSidebarOpen ? "justify-center" : "justify-start"}`}
                >
                  {/* Dynamic Render Icon */}
                  <span className="menu-item-icon-size shrink-0">
                    {item.icon}
                  </span>

                  {/* Dynamic Render Label - Only text displays when open */}
                  {isSidebarOpen && (
                    <span className="menu-item-text text-sm font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
