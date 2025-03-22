import { useState } from 'react';
import {
     CheckCircleIcon, ExclamationCircleIcon,
     ClockIcon, UserGroupIcon, ChartBarIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
     // Dummy data - replace with actual API data later
     const metrics = [
          { name: 'Total Queries Resolved', value: '1,234', icon: CheckCircleIcon, color: 'text-green-500' },
          { name: 'Pending Escalations', value: '23', icon: ExclamationCircleIcon, color: 'text-red-500' },
          { name: 'Avg Response Time', value: '2.5m', icon: ClockIcon, color: 'text-blue-500' },
          { name: 'Active Users', value: '456', icon: UserGroupIcon, color: 'text-purple-500' },
          { name: 'Satisfaction Rate', value: '94%', icon: ChartBarIcon, color: 'text-yellow-500' },
     ];

     return (
          <div className="space-y-6">
               <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>

               {/* Metrics Grid */}
               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {metrics.map((metric) => (
                         <div key={metric.name} className="p-6 bg-gray-800 rounded-lg shadow-lg">
                              <div className="flex items-center">
                                   <metric.icon className={`w-8 h-8 ${metric.color}`} />
                                   <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-400">{metric.name}</p>
                                        <p className="text-2xl font-semibold text-white">{metric.value}</p>
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>

               {/* Quick Actions */}
               <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
                    <button className="p-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                         Add New FAQ
                    </button>
                    <button className="p-4 text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                         View Reports
                    </button>
                    <button className="p-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                         Manage Roles
                    </button>
               </div>
          </div>
     );
};

export default Dashboard; 