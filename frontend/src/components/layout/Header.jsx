import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
     BellIcon,
     ChevronDownIcon,
     UserIcon,
     Cog6ToothIcon,
     ArrowRightOnRectangleIcon,
     UserCircleIcon,
} from '@heroicons/react/24/outline';
import SearchBar from './SearchBar';
import QuickActions from './QuickActions';
import UserDropdown from '../shared/UserDropdown';

const NotificationItem = ({ title, description, time, type }) => (
     <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
          <div className="flex items-start">
               <div className="flex-1">
                    <p className="text-sm font-medium text-white">{title}</p>
                    <p className="text-xs text-white/70 mt-1">{description}</p>
               </div>
               <span className="text-xs text-white/50">{time}</span>
          </div>
     </div>
);

const DropdownItem = ({ icon: Icon, text }) => (
     <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <Icon className="w-5 h-5" />
          <span>{text}</span>
     </button>
);

const Header = () => {
     const [showProfileDropdown, setShowProfileDropdown] = useState(false);
     const [showNotifications, setShowNotifications] = useState(false);
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

     return (
          <header className="relative bg-gray-900/40 backdrop-blur-xl border-b border-white/10">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                         <div className="flex-1 flex items-center justify-between">
                              <div className="flex-shrink-0">
                                   <h1 className="text-white text-xl font-semibold">Dashboard</h1>
                              </div>

                              <div className="flex items-center space-x-4">
                                   <button className="text-gray-300 hover:text-white">
                                        <BellIcon className="w-6 h-6" />
                                   </button>
                                   <UserDropdown />
                              </div>
                         </div>
                    </div>
               </div>
          </header>
     );
};

export default Header; 