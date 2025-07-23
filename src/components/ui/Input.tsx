import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          )}
          <motion.input
            ref={ref}
            className={`
              w-full px-4 py-3 border border-gray-300 rounded-xl
              ${Icon ? 'pl-12' : ''}
              ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}
              focus:border-transparent focus:outline-none focus:ring-2
              transition-all duration-200 bg-white/50 backdrop-blur-sm
              ${className}
            `}
            whileFocus={{ scale: 1.01 }}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';