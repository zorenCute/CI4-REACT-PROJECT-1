import type { Dispatch, SetStateAction } from "react";
import { SIDEBAR_GROUPS } from "../../config/DashboardConfig";
import type { UserRole, ViewId } from "../../config/DashboardConfig";
import { FaBuilding } from "react-icons/fa";
import { useConfig } from "../../lib/ConfigProvider";

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
  useConfig();
  const menuGroups = SIDEBAR_GROUPS[userRole];

  return (
    <div
      className={`bg-white dark:bg-gray-900 backdrop-blur-md z-20 transition-all duration-300  ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
{/* Abstract Background Elements */}
<div className="absolute inset-0 overflow-hidden -z-20">
  <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary opacity-5 rounded-full blur-2xl"></div>
  <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-light opacity-5 rounded-full blur-2xl"></div>
  
  {/* Floating particles - Enhanced version */}
  {[...Array(15)].map((_, i) => (
    <div
      key={i}
      className="absolute bg-primary opacity-20 rounded-full"
      style={{
        width: `${2 + Math.random() * 4}px`,
        height: `${2 + Math.random() * 4}px`,
        top: `${10 + Math.random() * 80}%`,
        left: `${Math.random() * 100}%`,
        animation: `float ${8 + Math.random() * 12}s infinite ease-in-out`,
        animationDelay: `${Math.random() * 7}s`,
        filter: 'blur(0.5px)',
        boxShadow: '0 0 2px var(--color-primary)'
      }}
    ></div>
  ))}
  
  {/* Additional larger particles */}
  {[...Array(5)].map((_, i) => (
    <div
      key={`large-${i}`}
      className="absolute bg-primary-light opacity-15 rounded-full"
      style={{
        width: `${2 + Math.random() * 8}px`,
        height: `${2 + Math.random() * 8}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `float-large ${10 + Math.random() * 15}s infinite ease-in-out`,
        animationDelay: `${Math.random() * 10}s`,
        filter: 'blur(2px)',
      boxShadow: '0 0 12px var(--color-primary-light)'
      }}
    ></div>
  ))}
</div>

      {/* Logo/Header Section */}
      <div className="p-4 flex items-center justify-between ">
        {sidebarOpen ? (
          <div className="flex items-center space-x-2">
            <FaBuilding className="text-2xl text-primary" />
            <h1 className="text-xl font-bold text-primary">
             ZZC INC.
            </h1>
          </div>
        ) : (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-md hover:bg-primary-light/20 text-primary transition-all duration-300"
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
            className="p-1.5 rounded-md bg-primary-light/20 text-primary hover:bg-primary-light/30 transition-all duration-300"
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
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                {group.groupName}
              </h3>
            )}

            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center w-full p-3 rounded-lg mb-1 transition-all duration-300 ${
                  activeView === item.id
                    ? "bg-gray-400/10 dark:bg-gray-400/5 text-primary dark:text-cyan-100 font-medium shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:bg-cyan-500/10 hover:text-primary"
                }`}
              >
                <span 
                  className={`flex-shrink-0 transition-colors duration-300 ${
                    activeView === item.id ? "text-primary-dark" : "text-primary"
                  }`}
                >
                  {item.icon}
                </span>
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

    </div>
  );
}