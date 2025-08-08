// config/dashboardConfig.ts
import DashboardView from '../pages/dashboardviews/DashboardView';
import UsersView from '../pages/dashboardviews/UsersView';
import MaintenanceView from '../pages/dashboardviews/MaintenanceView';
import { FaChartPie as DashboardIcon, FaUsers as UsersIcon, FaFileAlt as ReportsIcon } from 'react-icons/fa';


type SidebarItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
};

export type UserRole = 'ADMIN' | 'USER' | 'GUEST';

export const SIDEBAR_ITEMS: Record<UserRole, SidebarItem[]> = {
  ADMIN: [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { id: 'users', label: 'Users', icon: <UsersIcon />, path: '/users' },
    { id: 'xmaintenance', label: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  ],
  USER: [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { id: 'xmaintenance', label: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  ],
  GUEST: [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  ],
};

export const VIEW_COMPONENTS = {
  dashboard: DashboardView,
  users: UsersView,
  xmaintenance: MaintenanceView,
};