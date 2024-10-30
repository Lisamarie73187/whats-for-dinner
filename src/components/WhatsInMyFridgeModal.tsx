import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton';

interface WhatsInMyFridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialIngredients = [
  "Almonds", "Apples", "Asparagus", "Avocado", "Bananas", "Beef", "Bell Peppers",
  "Black Beans", "Black Eyed Peas", "Blueberries", "Bread Crumbs", "Broccoli", "Butter Beans", 
  "Cabbage", "Cannellini Beans", "Carrots", "Cauliflower", "Celery", "Cheddar Cheese", 
  "Chicken", "Cod", "Corn", "Cucumber", "Eggplant", "Eggs", "Garbanzo Beans", "Garlic", 
  "Ginger", "Grapes", "Green Beans", "Green Onions", "Kale", "Lamb", "Lemon", "Lemons", 
  "Lettuce", "Limes", "Mahi Mahi", "Mango", "Milk", "Mushrooms", "Oats", "Onions", 
  "Oranges", "Parmesan", "Pasta", "Peanut Butter", "Peanuts", "Peas", "Peppers", 
  "Pineapple", "Pinto Beans", "Pork", "Potatoes", "Quinoa", "Radishes", "Refried Beans", 
  "Rice", "Romaine", "Salmon", "Spinach", "Squash", "Steak", "Strawberries", 
  "Sweet Potatoes", "Tilapia", "Tofu", "Tomatoes", "Tortillas", "Turkey", "Walnuts", 
  "Zucchini"
];

const LOCAL_STORAGE_KEY = "selectedIngredients";

const WhatsInMyFridgeModal: React.FC<WhatsInMyFridgeModalProps> = ({ isOpen, onClose }) => {
  const [ingredientState, setIngredientState] = useState<{ [key: string]: boolean }>(() => {
    const storedIngredients = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedIngredients
      ? JSON.parse(storedIngredients)
      : initialIngredients.reduce((acc, ingredient) => {
          acc[ingredient] = false;
          return acc;
        }, {} as { [key: string]: boolean });
  });

  const toggleIngredient = (ingredient: string) => {
    setIngredientState((prevState) => ({
      ...prevState,
      [ingredient]: !prevState[ingredient],
    }));
  };

  const saveIngredients = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ingredientState));
    onClose();
  };

  const resetIngredients = () => {
    setIngredientState(initialIngredients.reduce((acc, ingredient) => {
      acc[ingredient] = false;
      return acc;
    }, {} as { [key: string]: boolean }));
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-fridge-content">
        <button className="modal-close" onClick={resetIngredients}>×</button>
        <div className="modal-fridge-title">What's in My Fridge?</div>
        <div className="ingredients-fridge-list">
          {initialIngredients.map((ingredient) => (
            <motion.button
              key={ingredient}
              onClick={() => toggleIngredient(ingredient)}
              className={`toggle-ingredients-button ${ingredientState[ingredient] ? 'active' : ''}`}
              whileTap={{ scale: 0.9 }}
            >
              {ingredient}
            </motion.button>
          ))}
        </div>
        <AnimatedButton text='Save' onClick={saveIngredients} color="#FFA500" width={'100%'}/>
      </div>
    </div>
  );
};

export default WhatsInMyFridgeModal;
