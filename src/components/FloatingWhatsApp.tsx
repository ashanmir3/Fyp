import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const predefinedMessages = [
    "Hi! I'd like to know more about your services.",
    "Can you help me with skin analysis?",
    "I need to schedule a consultation.",
    "What are your pricing options?"
  ];

  const handleSendMessage = (msg?: string) => {
    const textToSend = msg || message;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(textToSend)}`;
    window.open(whatsappUrl, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200/50 z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">DermaAssist Support</h3>
                    <p className="text-green-100 text-sm">Typically replies instantly</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-green-600 rounded-full p-1 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <div className="bg-gray-100 rounded-2xl p-3">
                <p className="text-sm text-gray-700">
                  👋 Hi there! How can we help you today?
                </p>
              </div>

              {/* Quick Messages */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-medium">Quick messages:</p>
                {predefinedMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(msg)}
                    className="w-full text-left text-sm p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    {msg}
                  </button>
                ))}
              </div>

              {/* Custom Message */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-medium">Or type your message:</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!message.trim()}
                    className="bg-green-500 text-white p-2 rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg flex items-center justify-center text-white z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: [
            '0 4px 20px rgba(34, 197, 94, 0.3)',
            '0 4px 30px rgba(34, 197, 94, 0.5)',
            '0 4px 20px rgba(34, 197, 94, 0.3)'
          ]
        }}
        transition={{ 
          boxShadow: { duration: 2, repeat: Infinity },
          scale: { duration: 0.2 }
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </motion.div>
      </motion.button>
    </>
  );
};