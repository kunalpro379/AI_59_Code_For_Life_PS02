import { motion } from 'framer-motion';
import { MessageCircle, Mail, Slack, Video } from 'lucide-react';

export function IntegrationSection() {
     const platforms = [
          {
               name: "WhatsApp",
               icon: MessageCircle,
               color: "green",
               description: "Connect via WhatsApp for instant support",
               delay: 0.2
          },
          {
               name: "Microsoft Teams",
               icon: Video,
               color: "blue",
               description: "Seamless integration with MS Teams",
               delay: 0.4
          },
          {
               name: "Slack",
               icon: Slack,
               color: "purple",
               description: "Direct support through Slack channels",
               delay: 0.6
          },
          {
               name: "Email",
               icon: Mail,
               color: "red",
               description: "Traditional email support integration",
               delay: 0.8
          }
     ];

     return (
          <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
               <div className="container mx-auto px-4">
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         className="text-center mb-16"
                    >
                         <span className="px-4 py-2 bg-green-500/10 text-green-300 rounded-full text-sm font-medium">
                              Integrations
                         </span>
                         <h2 className="mt-8 text-4xl md:text-5xl font-bold text-white mb-6">
                              Connect Everywhere
                         </h2>
                         <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                              Access your ERP assistant through your preferred communication channels
                         </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                         {platforms.map((platform, index) => (
                              <motion.div
                                   key={index}
                                   initial={{ opacity: 0, y: 20 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   transition={{ delay: platform.delay }}
                                   whileHover={{ scale: 1.05 }}
                                   className="relative group cursor-pointer"
                              >
                                   <div className={`absolute inset-0 bg-${platform.color}-500/20 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl`} />
                                   <div className="relative bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-700">
                                        <platform.icon className={`w-12 h-12 text-${platform.color}-400 mb-6`} />
                                        <h3 className="text-xl font-semibold text-white mb-4">
                                             {platform.name}
                                        </h3>
                                        <p className="text-gray-400">
                                             {platform.description}
                                        </p>

                                        {/* Connection Status Indicator */}
                                        <div className="mt-6 flex items-center space-x-2">
                                             <div className={`w-2 h-2 rounded-full bg-${platform.color}-400 animate-pulse`} />
                                             <span className="text-sm text-gray-400">Connected</span>
                                        </div>
                                   </div>
                              </motion.div>
                         ))}
                    </div>

                    {/* API Integration Preview */}
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         className="mt-16 p-8 rounded-2xl bg-slate-800/50 border border-slate-700"
                    >
                         <pre className="overflow-x-auto p-4 rounded-lg bg-slate-900">
                              <code className="text-sm text-gray-300">
                                   {`// Example API Integration
const erp = new ERPAssistant({
  channels: ['whatsapp', 'teams', 'slack', 'email'],
  apiKey: 'your_api_key'
});

// Connect to all channels
await erp.connect();`}
                              </code>
                         </pre>
                    </motion.div>
               </div>
          </section>
     );
} 