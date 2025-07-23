import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Clock, Users, Award, Zap } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms provide accurate skin condition assessment in seconds.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Your medical data is protected with enterprise-grade security and privacy measures.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Get instant skin analysis and consultation scheduling anytime, anywhere.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Expert Dermatologists',
      description: 'Connect with board-certified dermatologists for professional consultations.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: '98.5% accuracy rate with over 50,000 successful diagnoses and treatments.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Receive detailed analysis reports and treatment recommendations immediately.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> DermaAssist</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of dermatology with our cutting-edge AI technology, 
            expert medical professionals, and comprehensive skin care solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50 h-full transition-all duration-300 group-hover:shadow-xl">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    className={`h-1 bg-gradient-to-r ${feature.color} rounded-full mt-6`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Skin Health?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied users who trust DermaAssist for their skin care needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Journey Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};