import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { ChartBarIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export function DashboardPreview() {
     const [activeTab, setActiveTab] = useState('hr');
     const { scrollYProgress } = useScroll();
     const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

     const dashboards = {
          hr: {
               title: "HR Dashboard",
               icon: UsersIcon,
               image: "https://cdn.dribbble.com/userupload/10549739/file/original-0b5d90c3a8c4d1e3b9f3d5c1f7223387.png?resize=1504x1128",
               features: [
                    "Employee Management",
                    "Leave Tracking",
                    "Attendance Monitoring",
                    "Performance Analytics"
               ]
          },
          finance: {
               title: "Finance Dashboard",
               icon: CurrencyDollarIcon,
               image: "https://cdn.dribbble.com/userupload/10549739/file/original-0b5d90c3a8c4d1e3b9f3d5c1f7223387.png?resize=1504x1128",
               features: [
                    "Revenue Analytics",
                    "Expense Tracking",
                    "Budget Management",
                    "Financial Reports"
               ]
          },
          sales: {
               title: "Sales Dashboard",
               icon: ChartBarIcon,
               image: "https://cdn.dribbble.com/userupload/10549739/file/original-0b5d90c3a8c4d1e3b9f3d5c1f7223387.png?resize=1504x1128",
               features: [
                    "Sales Performance",
                    "Lead Management",
                    "Pipeline Analysis",
                    "Revenue Forecasting"
               ]
          }
     };

     return (
          <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
               {/* Background Effects */}
               <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-3xl" />
                    <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-purple-500/10 to-transparent" />
               </div>

               <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                         <motion.span
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              className="inline-block px-4 py-2 bg-purple-500/10 text-purple-300 rounded-full text-sm font-medium mb-4"
                         >
                              Dashboard Preview
                         </motion.span>
                         <motion.h2
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              className="text-4xl md:text-5xl font-bold text-white mb-6"
                         >
                              Powerful Insights at Your Fingertips
                         </motion.h2>
                         <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              className="text-xl text-gray-400 max-w-3xl mx-auto"
                         >
                              Access real-time data and analytics across all departments with our intuitive dashboards
                         </motion.p>
                    </div>

                    {/* Dashboard Tabs */}
                    <div className="flex justify-center mb-12 space-x-4">
                         {Object.entries(dashboards).map(([key, value]) => (
                              <motion.button
                                   key={key}
                                   whileHover={{ scale: 1.05 }}
                                   whileTap={{ scale: 0.95 }}
                                   onClick={() => setActiveTab(key)}
                                   className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300
                ${activeTab === key
                                             ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                                             : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50'}`}
                              >
                                   <value.icon className="w-5 h-5" />
                                   <span>{value.title}</span>
                              </motion.button>
                         ))}
                    </div>

                    {/* Dashboard Preview */}
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         style={{ scale }}
                         className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
                    >
                         <div className="relative">
                              <img
                                   src={dashboards[activeTab].image}
                                   alt={dashboards[activeTab].title}
                                   className="w-full"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent">
                                   <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                             {dashboards[activeTab].features.map((feature, index) => (
                                                  <motion.div
                                                       key={index}
                                                       initial={{ opacity: 0, y: 20 }}
                                                       animate={{ opacity: 1, y: 0 }}
                                                       transition={{ delay: index * 0.1 }}
                                                       className="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-slate-700"
                                                  >
                                                       <p className="text-white text-sm font-medium">{feature}</p>
                                                  </motion.div>
                                             ))}
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </motion.div>

                    {/* Feature Highlights */}
                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                         {Object.entries(dashboards).map(([key, value]) => (
                              <motion.div
                                   key={key}
                                   initial={{ opacity: 0, y: 20 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   className="p-6 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700"
                              >
                                   <value.icon className="w-12 h-12 text-purple-400 mb-4" />
                                   <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                                   <ul className="space-y-2">
                                        {value.features.map((feature, index) => (
                                             <li key={index} className="text-gray-400 flex items-center">
                                                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2" />
                                                  {feature}
                                             </li>
                                        ))}
                                   </ul>
                              </motion.div>
                         ))}
                    </div>
               </div>
          </section>
     );
} 