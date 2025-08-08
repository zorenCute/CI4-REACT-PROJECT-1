// ===================================================
// 🛡️ AuthContext.tsx - Manages login/logout state globally
// ===================================================

// 📦 React hooks and types
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode' // ✅ named import, not default

// -------------------- 🔠 Types --------------------
interface MyJwtPayload {
  id: number
  username: string
  name: string
  role: string
  sub?: number // optional, if included
  exp?: number // optional, still supports expiration
  iat?: number
}

// Represents the shape of a user object or null (if not logged in)
type User = {
  id: number
  username: string
  name: string
  role: string
} | null


// What we’ll include inside the AuthContext
type AuthContextType = {
  user: User                               // The currently logged-in user
  login: (user: User, token?: string) => void  // Function to call when logging in
  logout: () => void                           // Function to call when logging out
  initialized: boolean                         // Tells us if auth setup is ready

}

// -------------------- 🧠 Create Context --------------------

// Create the AuthContext with empty/default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ===================================================
// 🧩 AuthProvider Component — wraps your app and provides auth state
// ===================================================

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // -------------------- 🧍‍♂️ User State --------------------
  // Load user from localStorage if exists, else null
  const [user, setUser] = useState<User>(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })

  // -------------------- ✅ Initialization Flag --------------------
  const [initialized, setInitialized] = useState(false)

  // -------------------- 🚀 Runs on Component Mount --------------------
 useEffect(() => {
  const token = localStorage.getItem('auth_token')

  if (token && !user) {
    try {
     const decoded = jwtDecode<MyJwtPayload>(token)


      // You can log or extract your custom claims
      const u = {
        id: decoded.id,
        username: decoded.username,
        name: decoded.name,
        role: decoded.role, 
      }

      setUser(u) // Update user context
    } catch (err) {
      console.error('Invalid token', err)
      localStorage.removeItem('auth_token') // Optional: auto-logout on invalid token
    }
  }

  setInitialized(true)
}, [])

// -------------------- 🛡️ Token mismatch detector --------------------
useEffect(() => {
  const tokenInStorage = localStorage.getItem('auth_token')

  // If we have both a user and a token, and the IDs don't match, force logout
  if (user && tokenInStorage) {
    try {
      const decoded = jwtDecode<MyJwtPayload>(tokenInStorage)

      // Compare by ID (or username if needed)
      if (user.id && decoded.sub !== user.id) {
        console.warn('Token/user mismatch detected — logging out')
        logout()
      }
    } catch (err) {
      console.error('Failed to decode token for comparison', err)
      logout()
    }
  }
}, [user])


  // -------------------- 🔐 Login Function --------------------
  const login = (u: User, token?: string) => {
    setUser(u)  // Update state
    if (u) localStorage.setItem('user', JSON.stringify(u))  // Save user
    if (token) localStorage.setItem('auth_token', token)    // Save token
  }

  // -------------------- 🚪 Logout Function --------------------
  const logout = () => {
    setUser(null)  // Clear state
    localStorage.removeItem('user')       // Remove user from storage
    localStorage.removeItem('auth_token') // Remove token
  }

  // -------------------- 🧃 Provide Context --------------------
  return (
    <AuthContext.Provider value={{ user, login, logout, initialized }}>
      {children}
    </AuthContext.Provider>
  )
}

// ===================================================
// 🪝 useAuth Hook — easy access to auth context
// ===================================================

export const useAuth = () => {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return ctx
}
