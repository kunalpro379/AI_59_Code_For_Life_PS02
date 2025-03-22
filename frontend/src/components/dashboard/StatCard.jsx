import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon, trend }) => (
     <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
               <div className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-violet-300" />
               </div>
               <div className={`flex items-center space-x-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                    {trend > 0 ? (
                         <ArrowTrendingUpIcon className="w-4 h-4" />
                    ) : (
                         <ArrowTrendingDownIcon className="w-4 h-4" />
                    )}
                    <span>{Math.abs(trend)}%</span>
               </div>
          </div>
          <h3 className="text-violet-200 text-sm mb-1">{title}</h3>
          <p className="text-white text-2xl font-semibold">{value}</p>
     </div>
);

export default StatCard; 