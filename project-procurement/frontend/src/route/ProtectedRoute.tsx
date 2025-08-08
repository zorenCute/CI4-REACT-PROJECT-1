// ===============================================
// 📌 ProtectedRoute Component
//    - Guards routes from unauthenticated access
// ===============================================

import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import type { JSX } from 'react'

// -----------------------------------------------
// 🧱 Component Definition
// -----------------------------------------------
export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: JSX.Element
  allowedRoles?: string[] // ['ADMIN', 'STUDENT'], etc.
}) {
  const { user, initialized } = useAuth()

  if (!initialized) return null
  if (!user) return <Navigate to="/" replace />

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
