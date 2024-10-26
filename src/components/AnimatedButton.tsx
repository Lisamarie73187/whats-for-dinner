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
        scale: 1.05, // Slightly enlarges the button on hover
        backgroundColor: '#eee', // Changes background color on hover
        boxShadow: '10px -6px 20px -10px rgba(0, 0, 0, 0.5)', // Enhances shadow on hover
      }}
      whileTap={{ scale: 0.95 }} // Shrinks the button slightly when clicked
      onClick={onClick} // Handles click event
      style={{
        backgroundColor: '#fffbf6',
        color: color,
        border: 'none',
        padding: '10px 20px',
        fontSize: '20px',
        cursor: 'pointer',
        borderRadius: '25px',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // Smooth transition
        fontFamily: 'Open Sans, sans-serif',
        marginTop: '20px',
        boxShadow: '10px -6px 15px -11px rgba(0, 0, 0, 0.75)',
        width: width, // Allows for dynamic width
      }}
    >
      {text}
    </motion.button>
  );
};

export default AnimatedButton;

