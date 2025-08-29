interface StatsCardProps {
  title: string
  value: string
  icon: string
  color: string
  trend: string
  trendColor: string
}

export default function StatsCard({ title, value, icon, color, trend, trendColor }: StatsCardProps) {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300'
  }

  const trendColorClasses = {
    green: 'bg-green-500 dark:bg-green-400',
    blue: 'bg-blue-500 dark:bg-blue-400',
    yellow: 'bg-yellow-500 dark:bg-yellow-400'
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold mt-1 text-gray-800 dark:text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
          </svg>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
          <span className={`inline-block w-2 h-2 rounded-full ${trendColorClasses[trendColor as keyof typeof trendColorClasses]} mr-1`}></span>
          <span>{trend}</span>
        </p>
      </div>
    </div>
  )
}