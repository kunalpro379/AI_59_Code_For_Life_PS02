import {
     Chart as ChartJS,
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     ArcElement,
     BarElement,
     Title,
     Tooltip,
     Legend
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     ArcElement,
     BarElement,
     Title,
     Tooltip,
     Legend
);

export const DoughnutChart = ({ data }) => {
     const chartData = {
          labels: ['Happy', 'Neutral', 'Unhappy'],
          datasets: [
               {
                    data: [70, 20, 10],
                    backgroundColor: [
                         'rgba(34, 197, 94, 0.6)',
                         'rgba(234, 179, 8, 0.6)',
                         'rgba(239, 68, 68, 0.6)',
                    ],
                    borderColor: [
                         'rgba(34, 197, 94, 1)',
                         'rgba(234, 179, 8, 1)',
                         'rgba(239, 68, 68, 1)',
                    ],
                    borderWidth: 1,
               },
          ],
     };

     const options = {
          responsive: true,
          plugins: {
               legend: {
                    position: 'bottom',
                    labels: {
                         color: 'white',
                    },
               },
          },
     };

     return <Doughnut data={chartData} options={options} />;
};

export const BarChart = ({ data }) => {
     const chartData = {
          labels: ['GST', 'HR', 'Finance', 'Sales', 'Support'],
          datasets: [
               {
                    label: 'Queries by Category',
                    data: [65, 45, 75, 55, 85],
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
               },
          ],
     };

     const options = {
          responsive: true,
          plugins: {
               legend: {
                    position: 'bottom',
                    labels: {
                         color: 'white',
                    },
               },
          },
          scales: {
               y: {
                    beginAtZero: true,
                    grid: {
                         color: 'rgba(255, 255, 255, 0.1)',
                    },
                    ticks: {
                         color: 'white',
                    },
               },
               x: {
                    grid: {
                         color: 'rgba(255, 255, 255, 0.1)',
                    },
                    ticks: {
                         color: 'white',
                    },
               },
          },
     };

     return <Bar data={chartData} options={options} />;
}; 