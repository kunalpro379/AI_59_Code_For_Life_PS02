import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

const NotificationCenter = ({ notifications = [] }) => {
     const defaultNotifications = [
          {
               id: 1,
               title: "New Query Assigned",
               description: "A new GST-related query has been assigned to you",
               time: "5 min ago"
          },
          {
               id: 2,
               title: "Knowledge Base Updated",
               description: "New FAQs added to the Finance section",
               time: "1 hour ago"
          }
     ];

     const displayNotifications = notifications.length > 0 ? notifications : defaultNotifications;

     return (
          <div className="backdrop-blur-xl border rounded-xl bg-gray-900/40 border-white/10 p-6">
               <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">Notifications</h2>
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                         {displayNotifications.length} new
                    </span>
               </div>

               <div className="space-y-4">
                    {displayNotifications.map((notification) => (
                         <div
                              key={notification.id}
                              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                         >
                              <div className="flex items-start">
                                   <div className="flex-1">
                                        <p className="text-white font-medium">{notification.title}</p>
                                        <p className="text-gray-400 text-sm mt-1">{notification.description}</p>
                                   </div>
                                   <span className="text-xs text-gray-500">{notification.time}</span>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default NotificationCenter; 