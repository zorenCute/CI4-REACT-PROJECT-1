import UserTableRow from '../../components/dashboard/UserTableRow'
import Dashboard from '../Dashboard'

export default function UsersView() {
  const users = [1, 2, 3, 4, 5]

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
   
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-gray-800 dark:text-white">User List</h3>
        <button 
        className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          
          Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-900">
          <thead className="bg-gray-50 dark:bg-gray-400">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 dark:text-gray-800 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 dark:text-gray-800 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 dark:text-gray-800 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 dark:text-gray-800 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-800 dark:text-gray-800 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-300 dark:divide-gray-700">
            {users.map((user) => (
              <UserTableRow key={user} id={user} />
            ))}
          </tbody>
        </table>
      </div>
     <div className="bg-white dark:bg-gray-800 ">
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">Showing 1 to 5 of 24 results</div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            Next
          </button>
        </div>
      </div>
 <Dashboard/>
       </div>
    </div>
  )
}