import type { Dispatch, SetStateAction } from 'react';
import { SIDEBAR_GROUPS } from '../../config/DashboardConfig';
import type { UserRole, ViewId } from '../../config/DashboardConfig';
import { FaBuilding } from 'react-icons/fa';
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  activeView: string;
  setActiveView: React.Dispatch<React.SetStateAction<ViewId>>;
  userRole: UserRole;
}

export default function Sidebar({ 
  sidebarOpen, 
  setSidebarOpen,
  activeView,
  setActiveView,
  userRole,
  
}: SidebarProps) {
  const menuGroups = SIDEBAR_GROUPS[userRole];

  return (
    <div className={`bg-white z-20 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      {/* Logo/Header Section (unchanged) */}
      <div className="p-4 flex items-center justify-between ">
        {sidebarOpen ? (
          // When sidebar is open, show icon and text
        <div className="flex items-center space-x-2">
          {/* Option 1: Using a React Icon */}
          <FaBuilding className="text-2xl text-green-800" /> {/* Adjust size and color */}
          {/* Option 2: Using an <img> tag for your logo */}
          {/* <img src="/path/to/your/logo.svg" alt="Company Logo" className="h-8 w-8" /> */}
          <h1 className="text-xl font-bold text-gray-800">ZION.ORG</h1>
        </div>
        ) : (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            aria-label="Open sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-md hover:bg-green-200 text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Grouped Navigation */}
      <nav className="p-2 mt-2 overflow-y-auto h-[calc(100vh-64px)]">
        {menuGroups.map((group) => (
          <div key={group.groupName} className="mb-4">
            {sidebarOpen && (
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {group.groupName}
              </h3>
            )}

            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
                  activeView === item.id 
                    ? 'bg-green-100 text-green-800 font-medium' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
}