import React from 'react';
import {
     ChatBubbleLeftIcon,
     UserIcon,
     ClockIcon
} from '@heroicons/react/24/outline';

const QueryManagement = ({ className }) => {
     const queries = [
          {
               id: 1,
               query: "Need help with GST filing process",
               user: "John Doe",
               status: "Pending",
               department: "Finance",
               timestamp: "2 hours ago"
          },
          {
               id: 2,
               query: "Payroll calculation issue",
               user: "Jane Smith",
               status: "In Progress",
               department: "HR",
               timestamp: "1 hour ago"
          }
     ];

     return (
          <div className={`backdrop-blur-xl border rounded-xl bg-gray-900/40 border-white/10 p-6 ${className}`}>
               <h2 className="text-xl font-semibold text-white mb-6">Query Management</h2>

               <div className="overflow-x-auto">
                    <table className="w-full">
                         <thead>
                              <tr className="text-gray-400 text-left">
                                   <th className="pb-4 px-4">Query</th>
                                   <th className="pb-4 px-4">User</th>
                                   <th className="pb-4 px-4">Department</th>
                                   <th className="pb-4 px-4">Status</th>
                                   <th className="pb-4 px-4">Time</th>
                              </tr>
                         </thead>
                         <tbody>
                              {queries.map((query) => (
                                   <tr key={query.id} className="border-t border-white/10">
                                        <td className="py-4 px-4">
                                             <div className="flex items-center">
                                                  <ChatBubbleLeftIcon className="w-5 h-5 text-blue-500 mr-2" />
                                                  <span className="text-white">{query.query}</span>
                                             </div>
                                        </td>
                                        <td className="py-4 px-4">
                                             <div className="flex items-center">
                                                  <UserIcon className="w-5 h-5 text-gray-400 mr-2" />
                                                  <span className="text-gray-300">{query.user}</span>
                                             </div>
                                        </td>
                                        <td className="py-4 px-4">
                                             <span className="text-gray-300">{query.department}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                             <span className={`px-2 py-1 rounded-full text-xs ${query.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                  query.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                                                       'bg-green-500/20 text-green-400'
                                                  }`}>
                                                  {query.status}
                                             </span>
                                        </td>
                                        <td className="py-4 px-4">
                                             <div className="flex items-center text-gray-400">
                                                  <ClockIcon className="w-4 h-4 mr-1" />
                                                  <span>{query.timestamp}</span>
                                             </div>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default QueryManagement; 