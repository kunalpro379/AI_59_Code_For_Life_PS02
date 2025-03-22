import React from 'react';

const MessageBubble = ({ message }) => (
     <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
               className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white'
                    }`}
          >
               <p>{message.text}</p>
               {message.attachments && (
                    <div className="mt-2 space-y-2">
                         {message.attachments.map((attachment, index) => (
                              <div key={index} className="bg-white/5 rounded p-2 text-sm">
                                   {attachment}
                              </div>
                         ))}
                    </div>
               )}
               <span className="text-xs opacity-50 mt-1 block">
                    {new Date(message.timestamp).toLocaleTimeString()}
               </span>
          </div>
     </div>
);

export default MessageBubble; 