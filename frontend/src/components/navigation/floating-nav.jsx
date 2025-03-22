import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default FloatingNav => {
     const [isOpen, setIsOpen] = useState(false);
     const [isDark, setIsDark] = useState(false);
     const { scrollY } = useScroll();
     const backgroundColor = useTransform(
          scrollY,
          [0, 100],
          ['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0.8)']
     );

     const navItems = [
          { name: 'Features', href: '#features' },
          { name: 'Solutions', href: '#solutions' },
          { name: 'Pricing', href: '#pricing' },
          { name: 'Resources', href: '#resources' },
     ];

     return (
          <motion.nav
               style={{ backgroundColor }}
               className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
          >
               <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                         {/* Logo */}
                         <Link to="/" className="flex items-center space-x-2">
                              <img src="/path/to/logo.svg" alt="Logo" className="h-8 w-auto" />
                              <span className="text-white font-bold text-xl">ERP Assistant</span>
                         </Link>

                         {/* Desktop Navigation */}
                         <div className="hidden md:flex items-center space-x-8">
                              {navItems.map((item) => (
                                   <a
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-300"
                                   >
                                        {item.name}
                                   </a>
                              ))}
                         </div>

                         {/* Action Buttons */}
                         <div className="hidden md:flex items-center space-x-4">
                              <button
                                   onClick={() => setIsDark(!isDark)}
                                   className="p-2 rounded-lg bg-slate-800/50 text-gray-300 hover:text-white transition-colors duration-300"
                              >
                                   {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                              </button>

                              <Link
                                   to="/login"
                                   className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300"
                              >
                                   Login
                              </Link>

                              <Link
                                   to="/signup"
                                   className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                              >
                                   Get Started
                              </Link>
                         </div>

                         {/* Mobile Menu Button */}
                         <button
                              onClick={() => setIsOpen(!isOpen)}
                              className="md:hidden p-2 rounded-lg bg-slate-800/50 text-gray-300 hover:text-white"
                         >
                              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                         </button>
                    </div>

                    {/* Mobile Navigation */}
                    <motion.div
                         initial={false}
                         animate={isOpen ? "open" : "closed"}
                         variants={{
                              open: { opacity: 1, height: "auto" },
                              closed: { opacity: 0, height: 0 }
                         }}
                         className="md:hidden overflow-hidden"
                    >
                         <div className="py-4 space-y-4">
                              {navItems.map((item) => (
                                   <a
                                        key={item.name}
                                        href={item.href}
                                        className="block px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300"
                                        onClick={() => setIsOpen(false)}
                                   >
                                        {item.name}
                                   </a>
                              ))}
                              <div className="border-t border-slate-700 pt-4 space-y-4">
                                   <Link
                                        to="/login"
                                        className="block px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300"
                                        onClick={() => setIsOpen(false)}
                                   >
                                        Login
                                   </Link>
                                   <Link
                                        to="/signup"
                                        className="block mx-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-center"
                                        onClick={() => setIsOpen(false)}
                                   >
                                        Get Started
                                   </Link>
                              </div>
                         </div>
                    </motion.div>
               </div>
          </motion.nav>
     );
} 