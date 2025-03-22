import React from 'react';

const TypingIndicator = () => (
     <div className="flex justify-start">
          <div className="bg-white/10 rounded-lg p-3 text-white">
               <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
               </div>
          </div>
     </div>
);

export default TypingIndicator; 