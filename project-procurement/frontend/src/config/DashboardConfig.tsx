import DashboardView from '../pages/dashboardviews/DashboardView';
import UsersView from '../pages/dashboardviews/UsersView';
import MaintenanceView from '../pages/dashboardviews/MaintenanceView';
import { 
  FaChartPie as DashboardIcon, 
  FaUsers as UsersIcon, 
  FaFileAlt as ReportsIcon,
  FaCog as SettingsIcon
} from 'react-icons/fa';

type SidebarItem = {
  id: ViewId;
  label: string;
  icon: React.ReactNode;
  path: string;
};

type SidebarGroup = {
  groupName: string;
  items: SidebarItem[];
};

export type UserRole = 'ADMIN' | 'USER' | 'GUEST';

export const SIDEBAR_GROUPS: Record<UserRole, SidebarGroup[]> = {
  ADMIN: [
    {
      groupName: "Management",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { id: 'users', label: 'Users', icon: <UsersIcon />, path: '/users' },
    
        { id: 'projects', label: 'Projects', icon: <UsersIcon />, path: '/users' },
        { id: 'submissions', label: 'Submissions', icon: <UsersIcon />, path: '/users' },
       
        { id: 'departments', label: 'Departments', icon: <UsersIcon />, path: '/users' },
       
      ]
    },
    {
      groupName: "Reports",
      items: [
        { id: 'xmaintenance', label: 'Reports', icon: <ReportsIcon />, path: '/reports' }
      ]
    },
    {
      groupName: "Settings",
      items: [
        { id: 'settings', label: 'System Settings', icon: <SettingsIcon />, path: '/settings' }
      ]
    }
  ],
  USER: [
    {
      groupName: "Workspace",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' }
      ]
    },
    {
      groupName: "Documents",
      items: [
        { id: 'xmaintenance', label: 'Reports', icon: <ReportsIcon />, path: '/reports' }
      ]
    }
  ],
  GUEST: [
    {
      groupName: "General",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' }
      ]
    }
  ]
};
export const VIEW_COMPONENTS = {
  dashboard: DashboardView,
  users: UsersView,
  xmaintenance: MaintenanceView,
  settings: MaintenanceView,
  projects: MaintenanceView,
  departments: DashboardView,
  submissions: MaintenanceView,
} as const;  // <-- Important 'as const' assertion

// Automatically derive ViewId from VIEW_COMPONENTS keys
export type ViewId = keyof typeof VIEW_COMPONENTS;