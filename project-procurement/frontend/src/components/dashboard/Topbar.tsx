import { useState} from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUsers as UsersIcon } from "react-icons/fa";
import { SIDEBAR_GROUPS, type UserRole, type ViewId } from "../../config/DashboardConfig";
import { LogOut, Settings, HelpCircle, ChevronDown } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useConfig } from "../../lib/ConfigProvider";
interface TopbarProps {
  activeView: ViewId;
  userRole: UserRole;
  sidebarOpen: boolean; 
}

export default function Topbar({ activeView, userRole, sidebarOpen }: TopbarProps) {
  
  useConfig();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const doLogout = () => {
    logout();
    navigate("/");
  };

  const getCurrentViewLabel = (viewId: ViewId, role: UserRole): string => {
    const allItemsForRole = SIDEBAR_GROUPS[role]?.flatMap((group) => group.items) || [];
    const activeItem = allItemsForRole.find((item) => item.id === viewId);
    return activeItem ? activeItem.label : "Dashboard Overview";
  };

  const currentLabel = getCurrentViewLabel(activeView, userRole);

  return (
    <header className="bg-white dark:bg-gray-900 backdrop-blur-md z-20  relative">
     {/* Abstract Background Elements (only mobile) */}
{!sidebarOpen && (
  <div className="absolute inset-0 overflow-hidden -z-10 block">
    <div className="absolute top-0 right-0 w-24 h-24 bg-primary opacity-10 rounded-full blur-xl"></div>
    <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary-light opacity-5 rounded-full blur-xl"></div>
  </div>
)}


      <div className="flex items-center justify-between p-4">
        {/* Current page title */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {currentLabel}
        </h2>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Profile button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-primary-light/20 transition-all duration-300"
          >
            {/* Avatar */}
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium shadow-sm"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {user?.name?.charAt(0) || "U"}
            </div>

            {/* Username */}
            <span className="hidden md:inline text-sm text-gray-700 dark:text-gray-200">
              {user?.name}
            </span>

            <ChevronDown
              className={`w-4 h-4 text-gray-600 dark:text-gray-200 transition-transform duration-300 ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown overlay panel */}
          {menuOpen && (
            <div className="absolute right-4 top-16 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl py-2 overflow-hidden">
              {/* Abstract Background in Dropdown */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary opacity-5 rounded-full blur-lg"></div>
              </div>

              {/* User Info */}
              <div className="px-4 py-3 ">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-md"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="text-md font-medium text-gray-800 dark:text-gray-100">
                      {user?.name}
                    </p>
                    <p className="text-xs text-primary dark:text-primary-light">
                      Active: {userRole}
                    </p>
                  </div>
                </div>
              </div>

              {/* Roles Grid */}
              <div className="px-3 py-3 ">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Available Roles
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    className="flex items-center justify-center px-2 py-2 rounded-lg text-xs font-medium text-white shadow-sm transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <UsersIcon className="mr-1 text-sm" />
                    Admin
                  </button>
                  <button className="flex items-center justify-center px-2 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                    <UsersIcon className="mr-1 text-sm" />
                    Faculty
                  </button>
                  <button className="flex items-center justify-center px-2 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                    <UsersIcon className="mr-1 text-sm" />
                    Student
                  </button>
                </div>
              </div>

              {/* Settings / Logout / Dark Mode */}
              <div className="px-2 py-2 space-y-1">
                <button className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg hover:bg-primary-light/20 text-sm font-medium text-gray-800 dark:text-gray-200 transition-all duration-300">
                  <Settings className="w-4 h-4" />
                  Settings & Privacy
                </button>

                <button className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg hover:bg-primary-light/20 text-sm font-medium text-gray-800 dark:text-gray-200 transition-all duration-300">
                  <HelpCircle className="w-4 h-4" />
                  Help & Support
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg hover:bg-primary-light/20 text-sm font-medium text-gray-800 dark:text-gray-200 transition-all duration-300"
                >
                  {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
                </button>

                <button
                  onClick={doLogout}
                  className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-sm font-medium text-red-600 dark:text-red-400 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}