import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText: React.FC = () => {
  const text = "WTF Should I Make for Dinner?";

  // Define animation variants for each word
  const wordAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 8,     // Controls the bounciness (lower value = more bounce)
        stiffness: 100, // Controls the speed of the spring (higher value = faster)
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,  // Delays each word slightly
          }
        }
      }}
      className="animated-text-container"
    >
      {text.split(" ").map((word, index) => (
        <motion.span 
          key={index} 
          variants={wordAnimation} 
          className="animated-text"
        >
          {word}&nbsp; {/* Adds space between words */}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
