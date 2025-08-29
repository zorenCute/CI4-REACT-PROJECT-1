interface UserTableRowProps {
  id: number
}

export default function UserTableRow({ id }: UserTableRowProps) {
  const names = ['John', 'Alice', 'Mike', 'Sarah', 'Emma']
  const initials = ['J', 'A', 'M', 'S', 'E']
  const emails = ['john', 'alice', 'mike', 'sarah', 'emma']

  const status = id % 3 === 0 ? 'Active' : id % 3 === 1 ? 'Pending' : 'Inactive'
  const statusClass = id % 3 === 0 
    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
    : id % 3 === 1 
      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' 
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-200 font-medium">
            {initials[id - 1]}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{names[id - 1]} </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {emails[id - 1]}@example.com
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {id % 2 === 0 ? 'Admin' : 'User'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-200 mr-3">Edit</button>
        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">View</button>
      </td>
    </tr>
  )
}
