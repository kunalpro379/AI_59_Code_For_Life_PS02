import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

const AnalyticsOverview = ({ transactionData, satisfactionData, queryData }) => {
     const lineChartData = {
          labels: transactionData.labels,
          datasets: [
               {
                    label: 'Transactions',
                    data: transactionData.values,
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
               },
          ],
     };

     const lineChartOptions = {
          responsive: true,
          plugins: {
               legend: {
                    position: 'bottom',
                    labels: { color: 'white' }
               },
          },
          scales: {
               y: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: 'white' }
               },
               x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: 'white' }
               }
          }
     };

     return (
          <div className="backdrop-blur-xl border rounded-xl bg-gray-900/40 border-white/10 p-6">
               <h2 className="text-xl font-semibold text-white mb-6">Analytics Overview</h2>
               <div className="h-[300px]">
                    <Line data={lineChartData} options={lineChartOptions} />
               </div>
          </div>
     );
};

export default AnalyticsOverview; 