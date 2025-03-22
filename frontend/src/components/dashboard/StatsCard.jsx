import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import Card from '../ui/Card';

const StatsCard = ({ title, value, trend, icon: Icon, color }) => (
     <Card>
          <div className="flex items-start justify-between">
               <div>
                    <p className="text-sm text-white/70">{title}</p>
                    <p className="text-2xl font-semibold text-white mt-1">{value}</p>
               </div>
               <div className={`bg-${color}-500/20 p-2 rounded-lg`}>
                    <Icon className={`w-6 h-6 text-${color}-400`} />
               </div>
          </div>
          <div className="flex items-center mt-4">
               {trend >= 0 ? (
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
               ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-400" />
               )}
               <span className={`text-sm ml-1 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {Math.abs(trend)}%
               </span>
          </div>
     </Card>
);

export default StatsCard; 