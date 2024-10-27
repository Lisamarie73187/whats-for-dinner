import React from 'react';
import { motion } from 'framer-motion';

interface RecipeProps {
  label: string;
  image: string;
  url: string;
}

const Recipe: React.FC<RecipeProps> = ({ label, image, url }) => {
  const openRecipe = () => window.open(url, "_blank");

  const scaleUpAnimation = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  };

  return (
    <div className="recipe-container" onClick={openRecipe}>
      <motion.div className="recipe-title" {...scaleUpAnimation}>
        {label}
      </motion.div>
      <motion.div
        className="image-wrapper"
        {...scaleUpAnimation}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src={image} alt={label} className="recipe-image" />
      </motion.div>
    </div>
  );
};

export default Recipe;
