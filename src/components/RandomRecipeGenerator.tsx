import React, { useState, useCallback } from 'react';
import LoadingComponent from './LoadingCompontent';
import { fetchAIRecipe } from '../api/fetchAIRecipes';
import ErrorModal from './ErrorModal';
import RecipeFiltering from './RecipeFiltering';
import { recipeResponse } from '../../types/types';
import MainScreen from './MainScreen';
import RecipeScreen from './RecipeScreen';

const ERROR_DEFAULT = "Oops! Something went wrong. Please try again later.";

const VEGETARIAN_KEY = "isVegetarian";
const GLUTEN_FREE_KEY = "isGlutenFree";
const DAIRY_FREE_KEY = "isDairyFree";

const RandomRecipeGenerator: React.FC = () => {
  const [recipe, setRecipe] = useState<recipeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetAll, setResetAll] = useState<boolean>(false);



  const getAIRecipe = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchAIRecipe({reset: resetAll });
      if(!response) {
        setError(ERROR_DEFAULT);
        return;
      }
      setRecipe(response);
      setResetAll(false);
    } catch (error) {
      setError(ERROR_DEFAULT);
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  }, [resetAll]);

  const reset = useCallback(() => {
    setRecipe(null);
    setError(null);
    setResetAll(true);
    localStorage.setItem(VEGETARIAN_KEY, "false");
    localStorage.setItem(GLUTEN_FREE_KEY, "false");
    localStorage.setItem(DAIRY_FREE_KEY, "false");
    localStorage.removeItem('selectedIngredients');
  }, []);


  return (
    <div className="container">
      {loading && <LoadingComponent />}
      {error && <ErrorModal text={error} show={!!error} onClose={() => setError(null)} />}
      
      {!recipe && !loading && (
        <MainScreen getAIRecipe={getAIRecipe} />
      )}

      {recipe && !loading && (
        <div>
          <RecipeScreen reset={reset} recipe={recipe} getAIRecipe={getAIRecipe} />
          <RecipeFiltering params={recipe.params} />
        </div>
      )}
      <div className="footer">Lisa Marie Herzberg ©2024</div>
    </div>
  );
};

export default RandomRecipeGenerator;
