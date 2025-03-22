import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ChatInterface = () => {
     const [messages, setMessages] = useState([]);
     const [inputMessage, setInputMessage] = useState('');
     const [isLoading, setIsLoading] = useState(false);
     const [suggestedQueries, setSuggestedQueries] = useState([
          'How do I file GST returns?',
          'Generate invoice report',
          'Check payment status',
          'Update company details'
     ]);

     const chatEndRef = useRef(null);

     const handleSendMessage = async (message) => {
          if (!message.trim()) return;

          const newMessage = {
               id: messages.length + 1,
               text: message,
               sender: 'user',
               timestamp: new Date().toISOString()
          };

          setMessages(prev => [...prev, newMessage]);
          setInputMessage('');
          setIsLoading(true);

          try {
               // Replace with your actual API call
               const response = await processMessage(message);

               const botResponse = {
                    id: messages.length + 2,
                    text: response.text,
                    sender: 'bot',
                    timestamp: new Date().toISOString(),
                    attachments: response.attachments,
                    suggestions: response.suggestions
               };

               setMessages(prev => [...prev, botResponse]);
               setSuggestedQueries(response.suggestions || suggestedQueries);
          } catch (error) {
               console.error('Error processing message:', error);
          } finally {
               setIsLoading(false);
          }
     };

     return (
          <div className="max-w-4xl mx-auto">
               <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-white/10">
                         <h1 className="text-xl font-semibold text-white">AI Assistant</h1>
                         <p className="text-sm text-white/70">Ask anything about GST, invoicing, or business operations</p>
                    </div>

                    {/* Chat Messages */}
                    <div className="h-[600px] flex flex-col">
                         <div className="flex-1 overflow-y-auto p-4 space-y-4">
                              {messages.length === 0 && (
                                   <div className="text-center py-8">
                                        <h2 className="text-lg font-medium text-white mb-4">Welcome to ERPilot Assistant</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                             {suggestedQueries.map((query, index) => (
                                                  <button
                                                       key={index}
                                                       onClick={() => handleSendMessage(query)}
                                                       className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left text-white/80 hover:text-white"
                                                  >
                                                       {query}
                                                  </button>
                                             ))}
                                        </div>
                                   </div>
                              )}

                              {/* Message List */}
                              {messages.map(message => (
                                   <MessageBubble key={message.id} message={message} />
                              ))}

                              {isLoading && <TypingIndicator />}
                              <div ref={chatEndRef} />
                         </div>

                         {/* Input Area */}
                         <div className="p-4 border-t border-white/10">
                              <form onSubmit={(e) => {
                                   e.preventDefault();
                                   handleSendMessage(inputMessage);
                              }}>
                                   <div className="flex space-x-2">
                                        <input
                                             type="text"
                                             value={inputMessage}
                                             onChange={(e) => setInputMessage(e.target.value)}
                                             placeholder="Type your message..."
                                             className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                             type="submit"
                                             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                             Send
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     );
};

// Add MessageBubble and TypingIndicator components here 