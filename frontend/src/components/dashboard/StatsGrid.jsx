import React from 'react';
import {
     ChatBubbleLeftIcon,
     ExclamationTriangleIcon,
     FaceSmileIcon,
     CurrencyRupeeIcon
} from '@heroicons/react/24/outline';
import StatsCard from './StatsCard';

const StatsGrid = ({ dashboardData }) => {
     return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <StatsCard
                    title="Queries Resolved"
                    value={dashboardData.totalQueries || "1,234"}
                    trend={+15}
                    icon={ChatBubbleLeftIcon}
                    color="blue"
               />
               <StatsCard
                    title="Pending Escalations"
                    value={dashboardData.pendingQueries || "23"}
                    trend={-5}
                    icon={ExclamationTriangleIcon}
                    color="yellow"
               />
               <StatsCard
                    title="User Satisfaction"
                    value={dashboardData.responseRate || "98%"}
                    trend={+2}
                    icon={FaceSmileIcon}
                    color="green"
               />
               <StatsCard
                    title="Total Sales"
                    value={dashboardData.totalTransactions || "₹1.2M"}
                    trend={+8}
                    icon={CurrencyRupeeIcon}
                    color="purple"
               />
          </div>
     );
};

export default StatsGrid; 