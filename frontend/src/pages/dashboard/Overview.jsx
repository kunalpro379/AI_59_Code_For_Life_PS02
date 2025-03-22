import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatsGrid from '../../components/dashboard/StatsGrid';
import QuickActions from '../../components/dashboard/QuickActions';
import AnalyticsSection from '../../components/dashboard/AnalyticsSection';
import ChatSection from '../../components/chat/ChatSection';
import { fetchDashboardStats } from '../../services/api';

const Overview = () => {
     const [dashboardData, setDashboardData] = useState({
          totalQueries: 0,
          pendingEscalations: 0,
          satisfactionRate: 0,
          avgResponseTime: '0s',
          activeUsers: 0
     });

     useEffect(() => {
          const loadDashboardData = async () => {
               try {
                    const stats = await fetchDashboardStats();
                    setDashboardData(stats);
               } catch (error) {
                    console.error('Error loading dashboard data:', error);
               }
          };

          loadDashboardData();
     }, []);

     return (
          <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
          >
               <h1 className="text-2xl font-semibold text-white mb-6">Dashboard Overview</h1>

               <StatsGrid data={dashboardData} />
               <QuickActions />

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    <div className="lg:col-span-2">
                         <AnalyticsSection />
                    </div>
                    <div>
                         <ChatSection />
                    </div>
               </div>
          </motion.div>
     );
};

export default Overview; 