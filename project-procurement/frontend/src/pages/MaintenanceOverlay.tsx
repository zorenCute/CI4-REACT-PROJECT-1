import { useEffect, useState } from 'react';
import { FaChartPie, FaUsers, FaFileAlt } from 'react-icons/fa';

export default function MaintenanceOverlay({ message }: { message?: string }) {
  const [showReloadPrompt, setShowReloadPrompt] = useState(false);

  // Show reload prompt after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowReloadPrompt(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Disabled Dashboard Preview */}
      <div className="blur-sm pointer-events-none select-none">
        <div className="space-y-6">
          {/* Full-width maintenance banner (disabled state) */}
          <div className="col-span-full bg-gray-50 border border-gray-200 rounded-lg p-6 text-center opacity-50">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-3 bg-gray-200 rounded-full animate-pulse">
                <div className="h-8 w-8"></div>
              </div>
              <div className="h-8 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Stats cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-gray-200 animate-pulse">
                    {item === 1 && <FaChartPie className="opacity-0" />}
                    {item === 2 && <FaUsers className="opacity-0" />}
                    {item === 3 && <FaFileAlt className="opacity-0" />}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="mt-3 h-3 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>

          {/* Recent activity skeleton */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Maintenance Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-8 rounded-xl border border-yellow-200 shadow-xl max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
              <svg
                className="h-6 w-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              MAINTENANCE IN PROGRESS
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {message || "We're performing scheduled maintenance. Please check back soon."}
            </p>
            
            {showReloadPrompt && (
              <div className="animate-bounce mb-4 text-sm text-yellow-600">
                Maintenance may be complete - try refreshing
              </div>
            )}
            
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors flex items-center justify-center mx-auto"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" 
                  clipRule="evenodd" 
                />
              </svg>
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}