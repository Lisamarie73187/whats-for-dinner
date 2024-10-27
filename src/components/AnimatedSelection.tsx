import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSelectionProps {
  text: string;
  onClick: () => void;
}

const AnimatedSelection: React.FC<AnimatedSelectionProps> = ({ text, onClick }) => {
  return (
    <motion.div
      className="animated-selection"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {text}
    </motion.div>
  );
};

export default AnimatedSelection;
