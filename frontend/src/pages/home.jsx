import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  ChevronDownIcon,
  BellIcon,
  UserCircleIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
  ExclamationCircleIcon,
  ClockIcon,
  CalendarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChatBubbleLeftIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  FaceSmileIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import StatCard from '../components/dashboard/StatCard';
import QuickAction from '../components/dashboard/QuickAction';
import TransactionCard from '../components/dashboard/TransactionCard';
import TransactionChart from '../components/dashboard/charts/TransactionChart';
import GSTSummary from '../components/dashboard/GSTSummary';
import { fetchDashboardStats, fetchRecentTransactions, fetchGSTData } from '../services/api';
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
import Header from '../components/layout/Header';
import StatsGrid from '../components/dashboard/StatsGrid';
import ChatSection from '../components/chat/ChatSection';
import AnalyticsSection from '../components/dashboard/AnalyticsSection';

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

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalTransactions: '₹0',
    activeUsers: '0',
    pendingQueries: '0',
    responseRate: '0%'
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const chatEndRef = useRef(null);
  const [transactionData, setTransactionData] = useState({
    labels: [],
    values: []
  });
  const [gstData, setGstData] = useState({
    cgst: 0,
    sgst: 0,
    igst: 0
  });
  const [transactionHistory, setTransactionHistory] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [satisfactionData] = useState({
    labels: ['Happy', 'Neutral', 'Unhappy'],
    values: [70, 20, 10],
  });
  const [queryData] = useState({
    labels: ['GST', 'HR', 'Finance', 'Sales', 'Support'],
    values: [65, 45, 75, 55, 85],
  });

  const mockTransactions = [
    {
      id: 1,
      title: 'Invoice #INV-2024-1234',
      amount: '₹45,000',
      status: 'Pending',
      type: 'invoice',
      timestamp: '10 minutes ago'
    },
    {
      id: 2,
      title: 'GST Return Filed',
      amount: '₹12,450',
      status: 'Completed',
      type: 'gst',
      timestamp: '2 hours ago'
    },
    // Add more mock transactions
  ];

  const quickActions = [
    { id: 1, title: 'New Invoice', icon: DocumentTextIcon, color: 'bg-blue-500' },
    { id: 2, title: 'File GST', icon: ChartBarIcon, color: 'bg-purple-500' },
    { id: 3, title: 'Add Payment', icon: CurrencyRupeeIcon, color: 'bg-green-500' },
    { id: 4, title: 'View Reports', icon: DocumentTextIcon, color: 'bg-orange-500' },
  ];

  useEffect(() => {
    // Scroll to bottom of chat
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Fetch dashboard stats
        const stats = await fetchDashboardStats();
        setDashboardData(stats);

        // Fetch transaction data
        const transactions = await fetchRecentTransactions();
        const processedData = processTransactionData(transactions);
        setTransactionData(processedData);

        // Fetch GST data
        const gst = await fetchGSTData();
        setGstData(gst);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Set fallback data
        setDashboardData({
          totalTransactions: '₹4.2M',
          activeUsers: '1,234',
          pendingQueries: '23',
          responseRate: '98%'
        });
      }
    };

    loadDashboardData();
  }, []);

  const processTransactionData = (transactions) => {
    // Process transaction data for the chart
    // This is just an example - adjust according to your data structure
    const last6Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const dummyValues = [30, 45, 57, 42, 65, 73];

    return {
      labels: last6Months,
      values: dummyValues
    };
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate API response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: 'I understand you want to know about the ERP system. How can I help you today?',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800/95 to-indigo-950">
      {/* Enhanced Grid Background */}
      <div className="fixed inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 transform rotate-45 scale-[4]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                rgba(255,255,255,0.03) 0px,
                rgba(255,255,255,0.03) 1px,
                transparent 1px,
                transparent 20px
              ),
              repeating-linear-gradient(
                0deg,
                rgba(255,255,255,0.03) 0px,
                rgba(255,255,255,0.03) 1px,
                transparent 1px,
                transparent 20px
              )`,
            backgroundSize: '20px 20px',
            backgroundPosition: 'center'
          }}
        />
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/80 to-gray-900/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10" />
      </div>

      {/* Main Content with Enhanced Animations */}
      <div className="relative z-10">
        <Header />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-100"
        >
          <StatsGrid dashboardData={dashboardData} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <AnalyticsSection
                transactionData={transactionData}
                satisfactionData={satisfactionData}
                queryData={queryData}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ChatSection
                messages={messages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
                isLoading={isLoading}
                chatEndRef={chatEndRef}
              />
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

// Update Card component with enhanced styling
const Card = ({ title, children, className }) => (
  <div className={`backdrop-blur-xl border rounded-xl bg-gray-900/40 border-white/10 text-gray-100 hover:bg-gray-900/50 transition-all duration-300 ${className}`}>
    {title && (
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

// Update StatsCard with enhanced animations
const StatsCard = ({ title, value, trend, icon: Icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <Card>
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
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <ArrowTrendingUpIcon className={`w-4 h-4 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`} />
        </motion.div>
        <span className={`text-sm ml-1 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {Math.abs(trend)}%
        </span>
      </div>
    </Card>
  </motion.div>
);

// Update NotificationItem with enhanced hover effects
const NotificationItem = ({ title, description, time, type }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
  >
    <div className="flex items-start">
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-gray-300 mt-1">{description}</p>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  </motion.div>
);

const DropdownItem = ({ icon: Icon, text }) => (
  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </button>
);

const DoughnutChart = ({ data }) => {
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
          color: 'rgb(15, 23, 42)'
        },
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

const BarChart = ({ data }) => {
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

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgb(15, 23, 42)',
          font: {
            weight: 500
          }
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: 'rgb(15, 23, 42)'
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: 'rgb(15, 23, 42)'
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default HomePage;
