import axios from 'axios';

const api = axios.create({
     baseURL: 'http://localhost:3000/api/v1',
});

export const fetchDashboardStats = async () => {
     try {
          const response = await api.get('/dashboard/stats');
          return response.data;
     } catch (error) {
          console.error('Error fetching dashboard stats:', error);
          // Return dummy data if API fails
          return {
               totalTransactions: '₹4.2M',
               activeUsers: '1,234',
               pendingQueries: '23',
               responseRate: '98%',
               trends: {
                    transactions: 12,
                    users: -5,
                    queries: 8,
                    response: 3
               }
          };
     }
};

export const fetchRecentTransactions = async () => {
     try {
          const response = await api.get('/transactions/recent');
          return response.data;
     } catch (error) {
          console.error('Error fetching transactions:', error);
          // Return dummy data from your MongoDB collection
          return [
               {
                    id: 1,
                    title: 'Invoice #INV-2024-1234',
                    amount: '₹45,000',
                    status: 'Pending',
                    type: 'invoice',
                    timestamp: '10 minutes ago'
               },
               // Add more dummy transactions
          ];
     }
};

export const fetchGSTData = async () => {
     try {
          const response = await api.get('/gst/summary');
          return response.data;
     } catch (error) {
          console.error('Error fetching GST data:', error);
          // Return dummy data from your gst_returns collection
          return {
               totalTaxableValue: '₹42.7M',
               totalCGST: '₹3.8M',
               totalSGST: '₹3.8M',
               totalIGST: '₹2.1M'
          };
     }
}; 