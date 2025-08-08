import StatsCard from '../../components/dashboard/StatsCard'
import RecentActivityItem from '../../components/dashboard/RecentActivityItem'

export default function DashboardView() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      color: "indigo",
      trend: "12% increase from last month",
      trendColor: "green"
    },
    {
      title: "Active Today",
      value: "567",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "green",
      trend: "8% from yesterday",
      trendColor: "blue"
    },
    {
      title: "New This Week",
      value: "89",
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
      color: "purple",
      trend: "3 pending approvals",
      trendColor: "yellow"
    }
  ]

  const activities = [1, 2, 3]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-medium text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((item) => (
            <RecentActivityItem 
              key={item}
              title={`New user registration #${item}234 completed`}
              time={`About ${item} hour ago`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}