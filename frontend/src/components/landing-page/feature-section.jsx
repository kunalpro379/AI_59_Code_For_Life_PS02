import { motion } from 'framer-motion';
import {
  MessageSquare,
  BarChart2,
  Users,
  Shield,
  Zap,
  Globe,
  Headphones,
  Database
} from 'lucide-react';

export function FeatureSection() {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Intelligent Chat Interface",
      description: "Natural language processing for instant, accurate responses across multiple channels including WhatsApp, Teams, and Slack.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Real-Time Analytics",
      description: "Live dashboards for HR, Finance, and Sales with interactive charts and customizable metrics.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Smart Knowledge Base",
      description: "Self-learning system that continuously improves through AI-driven insights and user feedback.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Intelligent Escalation",
      description: "Automated ticket routing with real-time status tracking and direct support agent connection.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="px-4 py-2 bg-purple-500/10 text-purple-300 rounded-full text-sm font-medium">
            Features
          </span>
          <h2 className="mt-8 text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need in One Place
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Streamline your enterprise operations with our comprehensive suite of AI-powered tools
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
              <div className="relative bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 h-full">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.gradient} mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}