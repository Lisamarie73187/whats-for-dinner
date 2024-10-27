import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  text: string;
  onClick: () => void;
  width?: string;
  color?: string;
}

const AnimatedButton: React.FC<ButtonProps> = ({ text, onClick, width = 'auto', color = '#fffbf6' }) => {
  return (
    <motion.button
      className="animated-button"
      style={{ backgroundColor: color, width: width }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default AnimatedButton;
