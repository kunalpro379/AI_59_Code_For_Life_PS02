import React from 'react';

const QuickActions = () => {
     return (
          <div className="hidden md:flex items-center space-x-2">
               <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors">
                    New Invoice
               </button>
               <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors">
                    File GST
               </button>
          </div>
     );
};

export default QuickActions; 