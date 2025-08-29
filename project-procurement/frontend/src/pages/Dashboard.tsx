import { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { SIDEBAR_GROUPS, VIEW_COMPONENTS } from '../config/DashboardConfig';
import type { ViewId } from '../config/DashboardConfig';
import { useAuth } from '../auth/AuthContext';
import type { UserRole } from '../config/DashboardConfig';
import useMaintenance from '../hooks/useMaintenance';
import MaintenanceOverlay from './MaintenanceOverlay';

// Helper function to safely convert to UserRole
const getUserRole = (role: string | undefined): UserRole => {
  const validRoles: UserRole[] = ['ADMIN', 'USER', 'GUEST'];
  return validRoles.includes(role as UserRole) ? (role as UserRole) : 'GUEST';
};

// Helper function to check view access in grouped structure
const checkViewAccess = (role: UserRole, viewId: string): boolean => {
  return SIDEBAR_GROUPS[role].some(group => 
    group.items.some(item => item.id === viewId)
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<ViewId>('dashboard');
  const maintenance = useMaintenance();
  const userRole = getUserRole(user?.role);

  // Maintenance check for non-admins
  if (userRole !== 'ADMIN') {
    if (maintenance === null) {
      return <div>Loading system status...</div>;
    }
    if (maintenance.isActive) {
      return <MaintenanceOverlay message={maintenance.message} />;
    }
  }

 // First, ensure availableViewIds is properly typed
const availableViewIds = SIDEBAR_GROUPS[userRole]
  .flatMap(group => 
    group.items
      .map(item => item.id)
      .filter((id): id is ViewId => Object.keys(VIEW_COMPONENTS).includes(id))
  );

// Then handle the view reset with type safety
if (!availableViewIds.includes(activeView)) {
  const defaultView = availableViewIds.length > 0 
    ? availableViewIds[0] 
    : 'dashboard'; // 'dashboard' is guaranteed to be ViewId
  setActiveView(defaultView);
  return null;
}
  const CurrentView = VIEW_COMPONENTS[activeView] || VIEW_COMPONENTS.dashboard;
  const hasAccess = checkViewAccess(userRole, activeView);

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