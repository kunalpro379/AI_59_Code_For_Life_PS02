import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, User, Bell, LogOut, Settings, ChevronDown, Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navigation = () => {
     const [isOpen, setIsOpen] = useState(false);
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [user, setUser] = useState(null);
     const [notifications, setNotifications] = useState([
          { id: 1, message: "Welcome to ResearchSync!", isNew: true },
          { id: 2, message: "Complete your profile to get started", isNew: true },
     ]);
     const navigate = useNavigate();
     const { scrollY } = useScroll();

     const backgroundColor = useTransform(
          scrollY,
          [0, 100],
          ['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0.8)']
     );

     useEffect(() => {
          const token = localStorage.getItem('token');
          const userData = localStorage.getItem('user');
          if (token && userData) {
               setIsLoggedIn(true);
               setUser(JSON.parse(userData));
          }
     }, []);

     const handleLogout = () => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsLoggedIn(false);
          setUser(null);
          navigate('/');
     };

     const getInitials = (name) => {
          if (!name) return 'U';
          return name.split(' ').map(n => n[0]).join('').toUpperCase();
     };

     return (
          <motion.nav
               style={{ backgroundColor }}
               className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/10"
          >
               <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                         {/* Logo */}
                         <Link to="/" className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                                   <Bot className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-white font-bold text-xl">
                                   <span className="text-indigo-400">ERP</span>
                                   <span className="text-purple-300">ilot</span>
                              </span>
                         </Link>

                         {/* Desktop Navigation */}
                         <div className="hidden md:flex items-center space-x-8">
                              <Link to="/features" className="text-white/70 hover:text-white transition-colors">
                                   Features
                              </Link>
                              <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                                   About
                              </Link>

                              {isLoggedIn ? (
                                   <div className="flex items-center space-x-6">
                                        {/* Notifications */}
                                        <DropdownMenu>
                                             <DropdownMenuTrigger asChild>
                                                  <Button variant="ghost" className="relative p-2">
                                                       <Bell className="h-5 w-5 text-white/70" />
                                                       {notifications.some(n => n.isNew) && (
                                                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                                                       )}
                                                  </Button>
                                             </DropdownMenuTrigger>
                                             <DropdownMenuContent className="w-80 bg-slate-800 border-slate-700 text-white">
                                                  <div className="p-2 text-sm font-medium">Notifications</div>
                                                  <DropdownMenuSeparator className="bg-slate-700" />
                                                  {notifications.map((notification) => (
                                                       <DropdownMenuItem
                                                            key={notification.id}
                                                            className="p-3 hover:bg-slate-700 cursor-pointer"
                                                       >
                                                            <div className="flex items-start space-x-2">
                                                                 {notification.isNew && (
                                                                      <span className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
                                                                 )}
                                                                 <span className="text-sm text-white/70">{notification.message}</span>
                                                            </div>
                                                       </DropdownMenuItem>
                                                  ))}
                                             </DropdownMenuContent>
                                        </DropdownMenu>

                                        {/* Profile Dropdown */}
                                        <DropdownMenu>
                                             <DropdownMenuTrigger asChild>
                                                  <Button variant="ghost" className="flex items-center space-x-2">
                                                       <Avatar className="h-8 w-8">
                                                            <AvatarImage src={user?.avatar} />
                                                            <AvatarFallback className="bg-purple-600 text-white">
                                                                 {getInitials(user?.firstName)}
                                                            </AvatarFallback>
                                                       </Avatar>
                                                       <span className="text-white/70">{user?.firstName}</span>
                                                       <ChevronDown className="h-4 w-4 text-white/70" />
                                                  </Button>
                                             </DropdownMenuTrigger>
                                             <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700 text-white">
                                                  <DropdownMenuItem
                                                       className="hover:bg-slate-700 cursor-pointer"
                                                       onClick={() => navigate('/dashboard')}
                                                  >
                                                       <User className="mr-2 h-4 w-4" />
                                                       <span>Dashboard</span>
                                                  </DropdownMenuItem>
                                                  <DropdownMenuItem
                                                       className="hover:bg-slate-700 cursor-pointer"
                                                       onClick={() => navigate('/profile')}
                                                  >
                                                       <Settings className="mr-2 h-4 w-4" />
                                                       <span>Settings</span>
                                                  </DropdownMenuItem>
                                                  <DropdownMenuSeparator className="bg-slate-700" />
                                                  <DropdownMenuItem
                                                       className="hover:bg-slate-700 cursor-pointer text-red-400"
                                                       onClick={handleLogout}
                                                  >
                                                       <LogOut className="mr-2 h-4 w-4" />
                                                       <span>Logout</span>
                                                  </DropdownMenuItem>
                                             </DropdownMenuContent>
                                        </DropdownMenu>
                                   </div>
                              ) : (
                                   <div className="flex items-center space-x-4">
                                        <Button
                                             onClick={() => navigate('/login')}
                                             variant="ghost"
                                             className="text-white/70 hover:text-white"
                                        >
                                             Login
                                        </Button>
                                        <Button
                                             onClick={() => navigate('/signup')}
                                             className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                                        >
                                             Sign Up
                                        </Button>
                                   </div>
                              )}
                         </div>

                         {/* Mobile Menu Button */}
                         <button
                              onClick={() => setIsOpen(!isOpen)}
                              className="md:hidden p-2 text-white/70 hover:text-white"
                         >
                              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                         </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isOpen && (
                         <div className="md:hidden py-4 border-t border-white/10">
                              <div className="flex flex-col space-y-4">
                                   <Link
                                        to="/features"
                                        className="text-white/70 hover:text-white transition-colors"
                                        onClick={() => setIsOpen(false)}
                                   >
                                        Features
                                   </Link>
                                   <Link
                                        to="/about"
                                        className="text-white/70 hover:text-white transition-colors"
                                        onClick={() => setIsOpen(false)}
                                   >
                                        About
                                   </Link>
                                   {isLoggedIn ? (
                                        <>
                                             <div className="flex items-center space-x-2 py-2">
                                                  <Avatar className="h-8 w-8">
                                                       <AvatarImage src={user?.avatar} />
                                                       <AvatarFallback className="bg-purple-600 text-white">
                                                            {getInitials(user?.firstName)}
                                                       </AvatarFallback>
                                                  </Avatar>
                                                  <span className="text-white">{user?.firstName}</span>
                                             </div>
                                             <Link
                                                  to="/dashboard"
                                                  className="text-white/70 hover:text-white transition-colors"
                                                  onClick={() => setIsOpen(false)}
                                             >
                                                  Dashboard
                                             </Link>
                                             <Link
                                                  to="/profile"
                                                  className="text-white/70 hover:text-white transition-colors"
                                                  onClick={() => setIsOpen(false)}
                                             >
                                                  Profile Settings
                                             </Link>
                                             <button
                                                  onClick={() => {
                                                       handleLogout();
                                                       setIsOpen(false);
                                                  }}
                                                  className="text-red-400 hover:text-red-300 transition-colors text-left"
                                             >
                                                  Logout
                                             </button>
                                        </>
                                   ) : (
                                        <>
                                             <Link
                                                  to="/login"
                                                  className="text-white/70 hover:text-white transition-colors"
                                                  onClick={() => setIsOpen(false)}
                                             >
                                                  Login
                                             </Link>
                                             <Link
                                                  to="/signup"
                                                  className="text-white/70 hover:text-white transition-colors"
                                                  onClick={() => setIsOpen(false)}
                                             >
                                                  Sign Up
                                             </Link>
                                        </>
                                   )}
                              </div>
                         </div>
                    )}
               </div>
          </motion.nav>
     );
}
export default Navigation;