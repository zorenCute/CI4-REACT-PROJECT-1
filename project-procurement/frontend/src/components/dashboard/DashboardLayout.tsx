import { useState, type Dispatch, type SetStateAction } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import type { UserRole } from '../../config/DashboardConfig'

interface DashboardLayoutProps {
  children: React.ReactNode
  activeView: string
  setActiveView: Dispatch<SetStateAction<string>>
  userRole: UserRole
}

export default function DashboardLayout({ 
  children, 
  activeView, 
  setActiveView,
  userRole 
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView}
        userRole={userRole}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}