import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
     UserIcon,
     Cog6ToothIcon,
     ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const DropdownMenu = ({ isOpen, onClose, align = 'right' }) => {
     const dropdownRef = useRef(null);

     useEffect(() => {
          const handleClickOutside = (event) => {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    onClose();
               }
          };

          document.addEventListener('mousedown', handleClickOutside);
          return () => document.removeEventListener('mousedown', handleClickOutside);
     }, [onClose]);

     const menuItems = [
          {
               icon: UserIcon,
               label: 'Profile',
               onClick: () => console.log('Profile clicked'),
          },
          {
               icon: Cog6ToothIcon,
               label: 'Settings',
               onClick: () => console.log('Settings clicked'),
          },
          {
               icon: ArrowRightOnRectangleIcon,
               label: 'Sign out',
               onClick: () => console.log('Sign out clicked'),
          },
     ];

     return (
          <AnimatePresence>
               {isOpen && (
                    <motion.div
                         ref={dropdownRef}
                         initial={{ opacity: 0, y: -10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         transition={{ duration: 0.2 }}
                         className={`absolute z-50 mt-2 w-48 rounded-xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-lg ${align === 'right' ? 'right-0' : 'left-0'
                              }`}
                    >
                         <div className="py-2">
                              {menuItems.map((item, index) => (
                                   <button
                                        key={index}
                                        onClick={item.onClick}
                                        className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                                   >
                                        <item.icon className="w-5 h-5 mr-3" />
                                        {item.label}
                                   </button>
                              ))}
                         </div>
                    </motion.div>
               )}
          </AnimatePresence>
     );
};

export default DropdownMenu; 