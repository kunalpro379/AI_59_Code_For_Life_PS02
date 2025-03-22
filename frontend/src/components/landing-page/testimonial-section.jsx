import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "HR Director",
      company: "Tech Solutions Inc.",
      image: "/path/to/testimonial1.jpg",
      quote: "The AI-powered HR dashboard has revolutionized our employee management. Response times have improved by 70%!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Finance Manager",
      company: "Global Enterprises",
      image: "/path/to/testimonial2.jpg",
      quote: "Real-time financial insights and automated reporting have made my job significantly easier. A game-changer!",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Sales Director",
      company: "Innovation Corp",
      image: "/path/to/testimonial3.jpg",
      quote: "The sales forecasting and lead management features are incredibly accurate. Our team's efficiency has doubled.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="px-4 py-2 bg-yellow-500/10 text-yellow-300 rounded-full text-sm font-medium">
            Testimonials
          </span>
          <h2 className="mt-8 text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how our AI-powered ERP assistant is transforming businesses
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="absolute top-0 right-0 -mr-4 -mt-4">
                <Quote className="w-16 h-16 text-purple-500/10" />
              </div>

              <div className="relative bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-700">
                {/* Rating */}
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg text-gray-300 mb-6">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-purple-500"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Users", value: "10,000+" },
            { label: "Queries Resolved", value: "1M+" },
            { label: "Response Time", value: "< 2s" },
            { label: "Satisfaction Rate", value: "98%" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}