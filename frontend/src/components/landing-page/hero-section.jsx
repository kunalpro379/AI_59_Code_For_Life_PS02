import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, Brain, BarChart3, Users } from 'lucide-react';

export function HeroSection({ videoUrl }) {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/path/to/grid-pattern.svg')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-indigo-500/10 rounded-full">
              <Bot className="w-5 h-5 text-indigo-400 mr-2" />
              <span className="text-indigo-400 font-medium">
                <span className="font-bold">ERP</span>ilot
              </span>
            </div>

            <h1 className="text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-200">
              Transform Your Enterprise Operations
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Unify your HR, Finance, and Sales operations with ERPilot's intelligent assistant.
              Get instant answers, real-time insights, and seamless automation across all channels.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/demo"
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/25"
                >
                  Request Demo
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/features"
                  className="px-8 py-4 border border-purple-400/30 rounded-lg font-medium text-purple-100 hover:bg-purple-500/10 transition-all duration-300"
                >
                  Explore Features
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Preview Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20 min-h-[400px] bg-white/5 backdrop-blur-lg">
              {videoUrl && (
                <video
                  src={videoUrl}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              )}
              {!videoUrl && (
                <div className="w-full h-full bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-pink-500/10" />
              )}

              {/* Floating Feature Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-8 top-1/4 bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-lg shadow-purple-500/20"
              >
                <Brain className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-sm text-white font-medium">AI-Powered Insights</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -right-6 top-1/3 bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-lg shadow-indigo-500/20"
              >
                <BarChart3 className="w-6 h-6 text-indigo-400 mb-2" />
                <p className="text-sm text-white font-medium">Real-time Analytics</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                className="absolute left-1/4 bottom-8 bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-lg shadow-pink-500/20"
              >
                <Users className="w-6 h-6 text-pink-400 mb-2" />
                <p className="text-sm text-white font-medium">Team Collaboration</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}