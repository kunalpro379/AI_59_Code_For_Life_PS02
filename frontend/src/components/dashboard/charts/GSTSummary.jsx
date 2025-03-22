import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GSTSummary = () => {
     const chartData = {
          labels: ['CGST', 'SGST', 'IGST'],
          datasets: [
               {
                    label: 'GST Distribution',
                    data: [38, 38, 24],
                    backgroundColor: [
                         'rgba(139, 92, 246, 0.8)',
                         'rgba(168, 85, 247, 0.8)',
                         'rgba(192, 132, 252, 0.8)',
                    ],
                    borderColor: [
                         'rgba(139, 92, 246, 1)',
                         'rgba(168, 85, 247, 1)',
                         'rgba(192, 132, 252, 1)',
                    ],
                    borderWidth: 1,
                    hoverOffset: 4
               }
          ]
     };

     const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
               legend: {
                    position: 'bottom',
                    labels: {
                         color: 'rgba(255, 255, 255, 0.8)',
                         padding: 20,
                         font: {
                              size: 12
                         }
                    }
               },
               tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'rgb(255, 255, 255)',
                    bodyColor: 'rgb(255, 255, 255)',
                    padding: 12,
                    callbacks: {
                         label: (context) => `${context.label}: ${context.parsed}%`
                    }
               }
          },
          cutout: '60%'
     };

     return (
          <div className="h-[300px] w-full p-4">
               <Doughnut data={chartData} options={options} />
          </div>
     );
};

export default GSTSummary; 