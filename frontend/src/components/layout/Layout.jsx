import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
     const [sidebarOpen, setSidebarOpen] = useState(false);

     return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800/95 to-indigo-950">
               <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

               <div className="lg:pl-64">
                    <Header onMenuClick={() => setSidebarOpen(true)} />

                    <main className="p-4 sm:p-6 lg:p-8">
                         <div className="max-w-7xl mx-auto">
                              <Outlet />
                         </div>
                    </main>
               </div>
          </div>
     );
};

export default Layout; 