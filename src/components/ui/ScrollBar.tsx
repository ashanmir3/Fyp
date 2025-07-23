import React from 'react';
import './ScrollBar.css';

interface ScrollBarProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export const ScrollBar: React.FC<ScrollBarProps> = ({
  children,
  className = '',
  maxHeight = '400px'
}) => {
  return (
    <div
      className={`custom-scrollbar ${className}`}
      style={{ maxHeight, overflowY: 'auto' }}
    >
      {children}
    </div>
  );
};