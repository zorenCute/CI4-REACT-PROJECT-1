import React, { useState, useEffect, memo } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import type { UserRole, ViewId } from '../../config/DashboardConfig';

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
  userRole
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768); // md breakpoint
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
  <div className="flex h-screen bg-white overflow-hidden">
      {/* ONLY CHANGE: Added transition classes to sidebar wrapper */}
      <div className={`
        h-full
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${sidebarOpen ? 'w-64' : 'w-20'}
      `}>
        <MemoizedSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeView={activeView}
          setActiveView={setActiveView}
          userRole={userRole}
        />
      </div>

     {/* EXISTING STRUCTURE - UNTOUCHED */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex-shrink-0 bg-white bg-opacity-90 backdrop-blur-sm z-10">
          <MemoizedTopbar
            activeView={activeView}
            userRole={userRole}
          />
        </div>
        
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden transition-all duration-300 rounded-tl-xl rounded-bl-xl">
          <div className="h-full overflow-y-auto bg-gray-300 p-6 rounded-tl-xl rounded-bl-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}