import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./route/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";


export default function App() {
  return (
    
    <BrowserRouter>
      <AuthProvider>
       
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/unauthorized" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
     
      </AuthProvider>
    </BrowserRouter>
  );
}
