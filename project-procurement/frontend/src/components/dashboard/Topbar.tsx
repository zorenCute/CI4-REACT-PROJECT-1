import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Topbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const doLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {window.location.pathname.includes('users') ? 'User Management' : 'Dashboard Overview'}
        </h2>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <span className="text-sm text-gray-600">{user?.name}</span>
          </div>
          <button
            onClick={doLogout}
            className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}