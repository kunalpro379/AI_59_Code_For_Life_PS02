import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, PaperClipIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState('web');
  const [userRole, setUserRole] = useState('');
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [quickStats, setQuickStats] = useState({
    pendingOrders: 0,
    totalSales: 0,
    openQueries: 0,
    inventoryAlerts: 0
  });

  const channels = [
    { id: 'web', name: 'Web Chat' },
    { id: 'whatsapp', name: 'WhatsApp' },
    { id: 'teams', name: 'MS Teams' },
    { id: 'slack', name: 'Slack' },
    { id: 'email', name: 'Email' }
  ];

  const suggestedQueries = [
    "How do I check my leave balance?",
    "Show me today's sales report",
    "Update my profile information"
  ];

  const getSuggestedQueriesByRole = (role) => {
    switch (role) {
      case 'Finance Manager':
        return [
          "Show me today's payment summary",
          "Generate GST reconciliation report",
          "List pending invoices"
        ];
      case 'Inventory Manager':
        return [
          "Show low stock items",
          "Check pending dispatch requests",
          "View stock aging report"
        ];
      default:
        return [
          "How do I check my leave balance?",
          "Show me today's sales report",
          "Update my profile information"
        ];
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setQuickStats({
          pendingOrders: 24,
          totalSales: 156789.50,
          openQueries: 12,
          inventoryAlerts: 5
        });

        setUserRole('Finance Manager');

        setSuggestedQueries(getSuggestedQueriesByRole('Finance Manager'));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setIsTyping(true);
    try {
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: "Based on your query, I found relevant information from our ERP system...",
          isBot: true
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Error processing query:', error);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
      {/* Sidebar */}
      <div className="w-64 bg-white/10 backdrop-blur-xl border-r border-violet-500/20">
        <div className="p-4">
          <div className="relative">
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full appearance-none bg-white/5 text-violet-100 py-2 px-4 pr-8 rounded-lg border border-violet-500/20 focus:outline-none focus:border-violet-400"
            >
              {channels.map(channel => (
                <option key={channel.id} value={channel.id} className="bg-indigo-900">
                  {channel.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-3 w-4 h-4 text-violet-300" />
          </div>
        </div>

        <div className="p-4 border-t border-violet-500/20">
          <h3 className="text-violet-200 font-semibold mb-3">Dashboard Overview</h3>
          <div className="space-y-2">
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-violet-300 text-sm">Pending Orders</div>
              <div className="text-violet-100 font-semibold">{quickStats.pendingOrders}</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-violet-300 text-sm">Today's Sales</div>
              <div className="text-violet-100 font-semibold">₹{quickStats.totalSales.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-violet-500/20">
          <h3 className="text-violet-200 font-semibold mb-3">Suggested Queries</h3>
          <div className="space-y-2">
            {suggestedQueries.map((query, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-left p-2 text-sm text-violet-300 hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setInput(query)}
              >
                {query}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${message.isBot
                    ? 'bg-white/10 text-violet-100 backdrop-blur-xl border border-violet-500/20'
                    : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
                    }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-4 text-violet-100">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-violet-500/20 bg-white/5 backdrop-blur-xl">
          <form onSubmit={handleSend} className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-violet-300 hover:text-violet-100 transition-colors"
            >
              <PaperClipIcon className="w-6 h-6" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 text-violet-100 rounded-lg px-4 py-2 focus:outline-none border border-violet-500/20 focus:border-violet-400 placeholder-violet-300"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-2 rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition-colors"
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
