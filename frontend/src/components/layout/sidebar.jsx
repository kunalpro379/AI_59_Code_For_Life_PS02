import React from "react";
import { Link } from 'react-router-dom';
import {
  HomeIcon, BookOpenIcon, QuestionMarkCircleIcon,
  ChartBarIcon, CogIcon, UserGroupIcon, BellIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Knowledge Base', href: '/knowledge-base', icon: BookOpenIcon },
    { name: 'Query Management', href: '/queries', icon: QuestionMarkCircleIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'User Management', href: '/users', icon: UserGroupIcon },
    { name: 'Notifications', href: '/notifications', icon: BellIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <span className="text-xl font-bold text-white">AI Dashboard</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white group"
            >
              <item.icon className="w-6 h-6 mr-3 text-gray-400 group-hover:text-white" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;