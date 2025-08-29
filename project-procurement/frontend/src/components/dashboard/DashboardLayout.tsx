import React, { useState, useEffect, memo } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { UserRole, ViewId } from "../../config/DashboardConfig";
import { useConfig } from "../../lib/ConfigProvider"; // Import the config hook

const MemoizedSidebar = memo(Sidebar);
const MemoizedTopbar = memo(Topbar);

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeView: ViewId;
  setActiveView: React.Dispatch<React.SetStateAction<ViewId>>;
  userRole: UserRole;
}

export default function DashboardLayout({
  children,
  activeView,
  setActiveView,
  userRole,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useConfig(); // Get the config with theme colors

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768); // md breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Sidebar Wrapper */}
      <div
        className={`
        h-full
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${sidebarOpen ? "w-64" : "w-20"}
      `}
      >
        <MemoizedSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeView={activeView}
          setActiveView={setActiveView}
          userRole={userRole}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Topbar */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm z-10">
          <MemoizedTopbar activeView={activeView} userRole={userRole} sidebarOpen={sidebarOpen}/>
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden transition-all duration-300 rounded-tl-xl rounded-bl-xl">
         <div className="h-full overflow-y-auto p-6 rounded-tl-xl rounded-bl-xl
               bg-gradient-to-bl from-gray-200 to-gray-300 dark:bg-gradient-to-bl
                dark:from-gray-600 dark:to-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}