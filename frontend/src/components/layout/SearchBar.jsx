import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = () => {
     return (
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
               <div className="relative">
                    <input
                         type="search"
                         placeholder="Search anything..."
                         className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <MagnifyingGlassIcon className="w-5 h-5 text-white/50 absolute right-3 top-1/2 transform -translate-y-1/2" />
               </div>
          </div>
     );
};

export default SearchBar; 