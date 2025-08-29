import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Swal from "sweetalert2";
import { useConfig } from "../lib/ConfigProvider";

export default function Login() {
  const { config } = useConfig();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // If already logged in, go to dashboard
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Credentials",
        text: "Please provide both username and password.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${config.API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.error || "Invalid username or password.",
        });
        setIsLoading(false);
        return;
      }
      login(data.user, data.token);
      // navigate will happen automatically from useEffect
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later.",
      });
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 overflow-hidden relative">
      {/* Abstract Background Elements - Using your theme colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary-light opacity-10 rounded-full blur-3xl animate-pulse-medium"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-primary opacity-15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary-light opacity-15 rounded-full blur-3xl animate-pulse-medium"></div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary opacity-20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 text-white dark:text-gray-900"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-current"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-current"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-current"
          ></path>
        </svg>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 transition-all duration-500 transform hover:scale-[1.1] hover:shadow-2xl relative overflow-hidden z-10 shadow-xl">
        {/* Card accent - Using gradient with your theme colors */}
        <div 
          className="absolute top-0 left-0 w-full h-2"
          style={{
            background: `linear-gradient(to right, var(--color-primary), var(--color-primary-light))`
          }}
        ></div>
        
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{
              background: `linear-gradient(to bottom right, var(--color-primary), var(--color-primary-light))`
            }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">ZZC INC.</h1>
          <p className="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <div className="relative">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700/50 dark:text-white transition-all duration-300 pl-12"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700/50 dark:text-white transition-all duration-300 pl-12 pr-12" // Added pr-12 for right padding
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              {/* Password visibility toggle */}
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg relative overflow-hidden group"
            style={{
              background: `linear-gradient(to right, var(--color-primary), var(--color-primary-light))`
            }}
          >
            <span className={`relative z-10 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              Sign in
            </span>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(to right, var(--color-primary-dark), var(--color-primary))`
              }}
            ></div>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <a href="#" className="text-primary hover:text-primary-dark font-medium transition-colors">
              Contact admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}