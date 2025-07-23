import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <motion.div
        className="relative"
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`
            w-5 h-5 rounded-lg border-2 transition-all duration-200 cursor-pointer
            ${checked 
              ? 'bg-gradient-to-r from-blue-600 to-green-600 border-transparent' 
              : 'border-gray-300 bg-white hover:border-blue-400'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={() => !disabled && onChange(!checked)}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: checked ? 1 : 0, 
              opacity: checked ? 1 : 0 
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center h-full"
          >
            <Check className="w-3 h-3 text-white" />
          </motion.div>
        </div>
      </motion.div>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium cursor-pointer ${
            disabled ? 'text-gray-400' : 'text-gray-700'
          }`}
          onClick={() => !disabled && onChange(!checked)}
        >
          {label}
        </label>
      )}
    </div>
  );
};