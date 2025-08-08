import React, { useState, memo } from 'react'; // Import memo, Dispatch, SetStateAction
import Sidebar from './Sidebar'; // Original Sidebar component
import Topbar from './Topbar';   // Original Topbar component
import type { UserRole, ViewId } from '../../config/DashboardConfig';

// --- Apply memo to Sidebar and Topbar ---
// Create memoized versions of the components
const MemoizedSidebar = memo(Sidebar);
const MemoizedTopbar = memo(Topbar);
// ----------------------------------------

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

  // Memoize the setActiveView and setSidebarOpen functions if they are passed down
  // to components that are also memoized and rely on referential equality for re-render checks.
  // For setActiveView, it's typically stable from useState.
  // For setSidebarOpen, it's also stable from useState.
  // If you pass 'doSomething' function from DashboardLayout to a MemoizedChild,
  // then 'doSomething' would need useCallback.

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Use the MemoizedSidebar */}
      <MemoizedSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView} // This setState function reference is stable
        userRole={userRole}
      />

      {/* This div now has rounded corners, a white background, and a shadow to make it stand out */}
      {/* The margins (ml, mt, mb, mr) create a gap around this main content block */}
      <div className="flex-1 flex flex-col overflow-hidden rounded-xl bg-white shadow-lg ml-3 mt-3 mb-3 mr-3">
        {/* Use the MemoizedTopbar */}
        <MemoizedTopbar
          activeView={activeView}
          userRole={userRole}
        />
        {/* The main content area itself also gets rounded corners */}
        <main className="flex-1 overflow-y-auto p-4 rounded-xl  bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}