import { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { SIDEBAR_ITEMS, VIEW_COMPONENTS } from '../config/DashboardConfig';
import { useAuth } from '../auth/AuthContext';
import type { UserRole } from '../config/DashboardConfig'; // Type-only import
import useMaintenance from '../hooks/UseMaintenance';
import MaintenanceOverlay from './MaintenanceOverlay';
// Helper function to safely convert to UserRole
const getUserRole = (role: string | undefined): UserRole => {
  const validRoles: UserRole[] = ['ADMIN', 'USER', 'GUEST'];
  return validRoles.includes(role as UserRole) ? (role as UserRole) : 'GUEST';
};

export default function Dashboard() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const maintenance = useMaintenance();
  // Get user role or default to 'guest'
    const userRole = getUserRole(user?.role);
     if (userRole === 'ADMIN') {
    if (maintenance === null) {
    return <div>Loading system status...</div>; // Initial loading
  }

  if (maintenance.isActive) {
    return <MaintenanceOverlay message={maintenance.message} />;
  }
  }
 
  // Get the current view component
  const CurrentView = VIEW_COMPONENTS[activeView as keyof typeof VIEW_COMPONENTS] || VIEW_COMPONENTS.dashboard;
  
  // Check if user has access to the current view
  const hasAccess = SIDEBAR_ITEMS[userRole].some(item => item.id === activeView);

  return (
    <DashboardLayout
      userRole={userRole}
      activeView={activeView}
      setActiveView={setActiveView}
    >
      {hasAccess ? <CurrentView /> : <VIEW_COMPONENTS.dashboard />}
    </DashboardLayout>
  );
}