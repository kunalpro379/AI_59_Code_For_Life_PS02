import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Minimize2, Maximize2, X } from 'lucide-react';
import { useState } from 'react';

export function FloatingChatWidget() {
     const [isOpen, setIsOpen] = useState(false);
     const [isMinimized, setIsMinimized] = useState(false);
     const [message, setMessage] = useState('');
     const [chatHistory, setChatHistory] = useState([
          {
               type: 'bot',
               message: 'Hello! How can I help you today?',
               timestamp: new Date()
          }
     ]);

     const handleSend = () => {
          if (!message.trim()) return;

          // Add user message
          setChatHistory([
               ...chatHistory,
               {
                    type: 'user',
                    message: message.trim(),
                    timestamp: new Date()
               }
          ]);

          // Clear input
          setMessage('');

          // Simulate bot response
          setTimeout(() => {
               setChatHistory(prev => [
                    ...prev,
                    {
                         type: 'bot',
                         message: 'Thanks for your message! Our team will get back to you soon.',
                         timestamp: new Date()
                    }
               ]);
          }, 1000);
     };

     return (
          <div className="fixed bottom-6 right-6 z-50">
               <AnimatePresence>
                    {isOpen && !isMinimized && (
                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              className="mb-4 w-96 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
                         >
                              {/* Chat Header */}
                              <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-between">
                                   <h3 className="text-white font-semibold">ERP Assistant</h3>
                                   <div className="flex items-center space-x-2">
                                        <button
                                             onClick={() => setIsMinimized(true)}
                                             className="p-1 hover:bg-white/20 rounded"
                                        >
                                             <Minimize2 className="w-4 h-4 text-white" />
                                        </button>
                                        <button
                                             onClick={() => setIsOpen(false)}
                                             className="p-1 hover:bg-white/20 rounded"
                                        >
                                             <X className="w-4 h-4 text-white" />
                                        </button>
                                   </div>
                              </div>

                              {/* Chat Messages */}
                              <div className="h-96 overflow-y-auto p-4 space-y-4">
                                   {chatHistory.map((chat, index) => (
                                        <motion.div
                                             key={index}
                                             initial={{ opacity: 0, y: 10 }}
                                             animate={{ opacity: 1, y: 0 }}
                                             className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                             <div
                                                  className={`max-w-[80%] p-3 rounded-2xl ${chat.type === 'user'
                                                       ? 'bg-purple-600 text-white'
                                                       : 'bg-slate-800 text-gray-300'
                                                       }`}
                                             >
                                                  <p>{chat.message}</p>
                                                  <span className="text-xs opacity-70 mt-1 block">
                                                       {chat.timestamp.toLocaleTimeString()}
                                                  </span>
                                             </div>
                                        </motion.div>
                                   ))}
                              </div>

                              {/* Chat Input */}
                              <div className="p-4 border-t border-slate-700">
                                   <div className="flex items-center space-x-2">
                                        <input
                                             type="text"
                                             value={message}
                                             onChange={(e) => setMessage(e.target.value)}
                                             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                             placeholder="Type your message..."
                                             className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                        <button
                                             onClick={handleSend}
                                             className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                                        >
                                             <Send className="w-5 h-5" />
                                        </button>
                                   </div>
                              </div>
                         </motion.div>
                    )}
               </AnimatePresence>

               {/* Chat Button */}
               <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                         if (isMinimized) {
                              setIsMinimized(false);
                         } else {
                              setIsOpen(!isOpen);
                         }
                    }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg"
               >
                    {isOpen && isMinimized ? (
                         <Maximize2 className="w-6 h-6" />
                    ) : (
                         <MessageSquare className="w-6 h-6" />
                    )}
               </motion.button>
          </div>
     );
} 