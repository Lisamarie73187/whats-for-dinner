import React from 'react';
import { Recipe } from '../../types/types';

interface RecipeModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose?: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-display-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="recipe-display-title">{recipe.title}</div>
        <div className="recipe-ingredients">
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.item} - {ingredient.amount}
              </li>
            ))}
          </ul>
        </div>

        <div className="recipe-instructions">
          <h3>Instructions</h3>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
