import { useState, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatSection = () => {
     const [messages, setMessages] = useState([]);
     const [inputMessage, setInputMessage] = useState('');
     const [isLoading, setIsLoading] = useState(false);
     const chatEndRef = useRef(null);

     const handleSendMessage = async (e) => {
          e.preventDefault();
          // ... message handling logic
     };

     return (
          <Card title="AI Assistant" className="h-[600px] flex flex-col">
               <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(message => (
                         <MessageBubble key={message.id} message={message} />
                    ))}
                    {isLoading && <TypingIndicator />}
                    <div ref={chatEndRef} />
               </div>

               <div className="p-4 border-t border-white/10">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                         <input
                              type="text"
                              value={inputMessage}
                              onChange={(e) => setInputMessage(e.target.value)}
                              placeholder="Ask anything..."
                              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                         />
                         <button
                              type="submit"
                              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                         >
                              <PaperAirplaneIcon className="w-5 h-5" />
                         </button>
                    </form>
               </div>
          </Card>
     );
};

export default ChatSection; 