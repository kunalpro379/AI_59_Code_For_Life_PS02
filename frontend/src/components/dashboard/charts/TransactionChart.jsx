import { Line } from 'react-chartjs-2';
import {
     Chart as ChartJS,
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Legend,
     Filler
} from 'chart.js';

ChartJS.register(
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Legend,
     Filler
);

const TransactionChart = ({ data = [] }) => {
     const chartData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
               {
                    label: 'Transactions',
                    data: [30, 45, 57, 42, 65, 73], // Default data if none provided
                    borderColor: 'rgb(139, 92, 246)',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgb(139, 92, 246)',
               }
          ]
     };

     const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
               legend: {
                    display: false,
               },
               tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'rgb(255, 255, 255)',
                    bodyColor: 'rgb(255, 255, 255)',
                    padding: 12,
                    displayColors: false
               }
          },
          scales: {
               x: {
                    grid: {
                         display: false,
                         color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                         color: 'rgba(255, 255, 255, 0.5)'
                    }
               },
               y: {
                    grid: {
                         color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                         color: 'rgba(255, 255, 255, 0.5)',
                         callback: (value) => `₹${value}K`
                    }
               }
          }
     };

     return (
          <div className="h-[300px] w-full p-4">
               <Line data={chartData} options={options} />
          </div>
     );
};

export default TransactionChart; 