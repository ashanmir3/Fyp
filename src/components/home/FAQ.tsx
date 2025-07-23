import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: 'How accurate is the AI skin analysis?',
      answer: 'Our AI model has been trained on over 100,000 dermatological images and maintains a 98.5% accuracy rate. However, AI analysis should complement, not replace, professional medical advice. We always recommend consulting with our certified dermatologists for comprehensive care.'
    },
    {
      id: 2,
      question: 'Is my medical data secure and private?',
      answer: 'Absolutely. We are fully HIPAA compliant and use enterprise-grade encryption to protect your data. Your images and medical information are stored securely and are never shared without your explicit consent. We follow strict privacy protocols to ensure your information remains confidential.'
    },
    {
      id: 3,
      question: 'How quickly can I get results from the skin analysis?',
      answer: 'Our AI analysis provides instant results within seconds of uploading your image. You\'ll receive a detailed report including condition identification, severity assessment, and initial treatment recommendations immediately. For professional consultation, appointments can typically be scheduled within 24-48 hours.'
    },
    {
      id: 4,
      question: 'Can I consult with real dermatologists through the platform?',
      answer: 'Yes! We have a network of over 200 board-certified dermatologists available for consultations. You can schedule video calls, send messages, and receive personalized treatment plans. Our doctors review AI analysis results and provide professional medical advice tailored to your specific needs.'
    },
    {
      id: 5,
      question: 'What types of skin conditions can be analyzed?',
      answer: 'Our AI can analyze a wide range of skin conditions including acne, eczema, psoriasis, rosacea, moles, rashes, dermatitis, and many others. The system can identify over 50 different skin conditions and provides detailed information about each one, including severity levels and treatment options.'
    },
    {
      id: 6,
      question: 'How much does the service cost?',
      answer: 'We offer flexible pricing options: Basic AI analysis is free for your first 3 scans. Premium plans start at $29/month and include unlimited AI analysis, priority doctor consultations, personalized treatment plans, and progress tracking. Professional consultations are available separately or as part of premium plans.'
    },
    {
      id: 7,
      question: 'Can I track my skin health progress over time?',
      answer: 'Yes! Our platform includes comprehensive progress tracking features. You can upload photos over time, compare before/after images, track treatment effectiveness, and monitor improvements. The system generates detailed progress reports that you can share with your healthcare providers.'
    },
    {
      id: 8,
      question: 'Is the app available on mobile devices?',
      answer: 'Our platform is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers. We\'re also developing dedicated mobile apps for iOS and Android that will be available soon with additional features like push notifications and offline access.'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about our AI-powered dermatology platform and services.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openItem === item.id ? (
                    <Minus className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Plus className="w-6 h-6 text-gray-400" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <div className="border-t border-gray-200 pt-6">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you 24/7. Get in touch with us for personalized assistance.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};