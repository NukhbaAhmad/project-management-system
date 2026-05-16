import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="flex h-screen w-screen bg-[#0d1321] text-[#e2e8f0] overflow-hidden">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>

      <div
        className={`flex-1 flex flex-col h-full min-w-0 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <div className="mx-auto max-w-[1600px] w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
