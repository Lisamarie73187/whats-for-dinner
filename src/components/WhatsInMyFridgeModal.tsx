import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WhatsInMyFridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialIngredients = [
    "Almonds", "Apples", "Asparagus", "Avocado", "Baking Powder", "Baking Soda", "Bananas",
    "Basil", "Beef", "Bell Peppers", "Blueberries", "Broccoli", "Brown Sugar", "Butter",
    "Carrots", "Cashews", "Cauliflower", "Celery", "Cheese", "Chicken", "Chocolate Chips",
    "Cilantro", "Corn", "Cucumber", "Cumin", "Eggplant", "Eggs", "Garlic", "Ginger",
    "Grapes", "Green Beans", "Green Onions", "Honey", "Kale", "Lemon", "Lettuce", "Lime",
    "Mango", "Milk", "Mushrooms", "Oats", "Olive Oil", "Onions", "Oranges", "Oregano",
    "Parsley", "Pasta", "Peanuts", "Peas", "Peppers", "Pineapple", "Pork", "Potatoes",
    "Quinoa", "Radishes", "Rice", "Rosemary", "Salmon", "Salt", "Soy Sauce", "Spinach",
    "Steak", "Strawberries", "Sugar", "Sweet Potatoes", "Thyme", "Tofu", "Tomatoes",
    "Tortillas", "Turkey", "Vinegar", "Walnuts", "Zucchini"
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

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ingredientState));
  }, [ingredientState]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-fridge-content">
        <button className="modal-close" onClick={onClose}>×</button>
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
      </div>
    </div>
  );
};

export default WhatsInMyFridgeModal;
