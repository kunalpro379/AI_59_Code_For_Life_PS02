import {
     ChartBarIcon,
     ExclamationCircleIcon,
     FaceSmileIcon,
     ClockIcon,
     UserGroupIcon
} from '@heroicons/react/24/outline';

const MetricsGrid = ({ data }) => {
     const metrics = [
          {
               title: 'Total Queries Resolved',
               value: data.resolvedQueries || '0',
               icon: ChartBarIcon,
               trend: 12,
               color: 'blue'
          },
          {
               title: 'Pending Escalations',
               value: data.pendingEscalations || '0',
               icon: ExclamationCircleIcon,
               trend: -5,
               color: 'red'
          },
          {
               title: 'User Satisfaction',
               value: data.satisfactionRate || '0%',
               icon: FaceSmileIcon,
               trend: 8,
               color: 'green'
          },
          {
               title: 'Avg Response Time',
               value: data.avgResponseTime || '0s',
               icon: ClockIcon,
               trend: -15,
               color: 'purple'
          },
          {
               title: 'Active Users',
               value: data.activeUsers || '0',
               icon: UserGroupIcon,
               trend: 20,
               color: 'indigo'
          }
     ];

     return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
               {metrics.map((metric, index) => (
                    <MetricCard key={index} {...metric} />
               ))}
          </div>
     );
};

const MetricCard = ({ title, value, icon: Icon, trend, color }) => (
     <div className="backdrop-blur-xl rounded-xl bg-gray-900/40 border border-white/10 p-6">
          <div className="flex items-start justify-between">
               <div>
                    <p className="text-sm text-gray-300">{title}</p>
                    <p className="text-2xl font-semibold text-white mt-1">{value}</p>
               </div>
               <div className={`bg-${color}-500/20 p-2 rounded-lg`}>
                    <Icon className={`w-6 h-6 text-${color}-500`} />
               </div>
          </div>
          <div className="flex items-center mt-4">
               <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trend >= 0 ? '+' : ''}{trend}%
               </span>
               <span className="text-gray-400 text-sm ml-2">vs last month</span>
          </div>
     </div>
);

export default MetricsGrid; 