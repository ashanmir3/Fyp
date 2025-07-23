import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  glass = false 
}) => {
  const baseClasses = 'rounded-2xl border border-gray-200/50 shadow-lg';
  const glassClasses = glass ? 'bg-white/10 backdrop-blur-md' : 'bg-white';
  
  return (
    <motion.div
      className={`${baseClasses} ${glassClasses} ${className}`}
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};