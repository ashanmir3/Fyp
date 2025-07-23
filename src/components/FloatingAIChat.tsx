import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageCircle } from 'lucide-react';
import { AIChat } from './AIChat';

export const FloatingAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggle = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={handleToggle}
        className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-green-500 to-blue-600 rounded-full shadow-lg flex items-center justify-center text-white z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: [
            '0 4px 20px rgba(16, 185, 129, 0.3)',
            '0 4px 30px rgba(16, 185, 129, 0.5)',
            '0 4px 20px rgba(16, 185, 129, 0.3)'
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
          {isOpen ? <MessageCircle className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </motion.div>
        
        {/* Notification Badge */}
        {!isOpen && !isMinimized && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-xs text-white font-bold">AI</span>
          </motion.div>
        )}
      </motion.button>

      {/* AI Chat Component */}
      <AnimatePresence>
        {isOpen && (
          <AIChat
            isOpen={isOpen}
            onClose={handleClose}
            onMinimize={handleMinimize}
          />
        )}
      </AnimatePresence>
    </>
  );
};