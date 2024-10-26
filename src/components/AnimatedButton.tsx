import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  text: string;
  onClick: () => void;
  width?: string;
  color?: string;
}

const AnimatedButton: React.FC<ButtonProps> = ({ text, onClick, width = 'auto', color = '#333' }) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        backgroundColor: '#eee',
        boxShadow: '10px -6px 20px -10px rgba(0, 0, 0, 0.5)',
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        backgroundColor: '#fffbf6',
        color: color,
        border: 'none',
        padding: '10px 20px',
        fontSize: '20px',
        cursor: 'pointer',
        borderRadius: '25px',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        fontFamily: 'Open Sans, sans-serif',
        marginTop: '20px',
        boxShadow: '10px -6px 15px -11px rgba(0, 0, 0, 0.75)',
        width: width,
      }}
    >
      {text}
    </motion.button>
  );
};

export default AnimatedButton;

