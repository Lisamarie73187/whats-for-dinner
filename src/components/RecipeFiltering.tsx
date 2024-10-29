import React from 'react';

interface RecipeFilteringProps {
  params: {
    cuisineTypeString?: string;
    mainIngredientString?: string;
    ingredients?: string;
    dietaryRestrictions?: string;
  };
}

const RecipeFiltering: React.FC<RecipeFilteringProps> = ({ params }) => {
  const { cuisineTypeString, mainIngredientString, ingredients, dietaryRestrictions } = params;

  return (
    <div className="recipe-filtering-container">
    {cuisineTypeString && <p className="recipe-filtering-item">Excluded cuisine: {cuisineTypeString}</p>}
    {mainIngredientString && <p className="recipe-filtering-item">Excluded ingredient: {mainIngredientString}</p>}
    {ingredients && <p className="recipe-filtering-item">Ingredients: {ingredients}</p>}
    {dietaryRestrictions && <p className="recipe-filtering-item">Dietary restrictions: {dietaryRestrictions}</p>}
  </div>
  );
};

export default RecipeFiltering;