// app/dashboard/maintenance.tsx
export default function MaintenanceView() {
  return (
    <div className="space-y-6">
      {/* Full-width maintenance banner */}
      <div className="col-span-full bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 bg-yellow-100 rounded-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-yellow-600" 
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
          <h2 className="text-2xl font-bold text-gray-800">MAINTENANCE IN PROGRESS</h2>
          <p className="text-gray-600 max-w-md">
            This page is currently undergoing scheduled maintenance. 
            We'll be back shortly. Thank you for your patience.
          </p>
        </div>
      </div>

      {/* Placeholder for stats cards - visually disabled */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>

      {/* Placeholder for recent activity - visually disabled */}
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 opacity-50">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex space-x-3">
              <div className="h-2 w-2 bg-gray-300 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}