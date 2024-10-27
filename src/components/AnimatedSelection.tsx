import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSelectionProps {
  text: string;
  onClick: () => void;
}

const AnimatedSelection: React.FC<AnimatedSelectionProps> = ({ text, onClick }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        color: '#fffbf6b2',
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        color: '#fffbf6',
        fontSize: '25px',
        cursor: 'pointer',
        fontFamily: "Irish Grover",
        marginTop: '50px',
        fontWeight: '400',
        width: '20vw',
        textAlign: 'center',
        transition: 'color 0.3s ease',
      }}
    >
      {text}
    </motion.div>
  );
};

export default AnimatedSelection;
