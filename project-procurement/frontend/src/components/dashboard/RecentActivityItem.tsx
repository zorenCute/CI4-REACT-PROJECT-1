interface RecentActivityItemProps {
  title: string
  time: string
}

export default function RecentActivityItem({ title, time }: RecentActivityItemProps) {
  return (
    <div className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="p-2 bg-gray-50 rounded-lg mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  )
}