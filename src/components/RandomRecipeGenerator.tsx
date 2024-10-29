import React, { useState, useEffect } from 'react';
import ButtonOptionsAI from './ButtonOptionsAI';
import LoadingComponent from './LoadingCompontent';
import HowAboutPrompt from './HowAboutPrompt';
import { fetchAIRecipe } from '../api/fetchAIRecipes';
import useRandomGetRecipeButtonPrompts from '../hooks/useRandomGetRecipePrompt';
import ErrorModal from './ErrorModal';
import Toggle from './Toggle';
import AnimatedHeader from './AnimatedHeader';
import AnimatedButton from './AnimatedButton';
import RecipeComponent from './Recipe';
import RecipeFiltering from './RecipeFiltering';
import RecipeDisplay from './RecipeDisplay';
import { recipeResponse } from '../../types/types';

const HEADER_TEXT = "FOOD CO";
const SUBHEADER_TEXT = "Your go-to guide on feeding yourself";
const ERROR_DEFAULT = "Oops! Something went wrong. Please try again later.";

const VEGETARIAN_KEY = "isVegetarian";
const GLUTEN_FREE_KEY = "isGlutenFree";
const DAIRY_FREE_KEY = "isDairyFree";

const RandomRecipeGenerator: React.FC = () => {
  const [recipe, setRecipe] = useState<recipeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetAll, setResetAll] = useState<boolean>(false);
  const [isShowRecipe, setIsShowRecipe] = useState<boolean>(false);

  const [isVegetarian, setIsVegetarian] = useState(() => localStorage.getItem(VEGETARIAN_KEY) === "true");
  const [isGlutenFree, setIsGlutenFree] = useState(() => localStorage.getItem(GLUTEN_FREE_KEY) === "true");
  const [isDairyFree, setIsDairyFree] = useState(() => localStorage.getItem(DAIRY_FREE_KEY) === "true");

  const getRecipeButtonPrompt = useRandomGetRecipeButtonPrompts();

  useEffect(() => {
    localStorage.setItem(VEGETARIAN_KEY, JSON.stringify(isVegetarian));
  }, [isVegetarian]);

  useEffect(() => {
    localStorage.setItem(GLUTEN_FREE_KEY, JSON.stringify(isGlutenFree));
  }, [isGlutenFree]);

  useEffect(() => {
    localStorage.setItem(DAIRY_FREE_KEY, JSON.stringify(isDairyFree));
  }, [isDairyFree]);

  const reset = () => {
    setRecipe(null);
    setError(null);
    setIsVegetarian(false);
    setIsGlutenFree(false);
    setIsDairyFree(false);
    setResetAll(true);
    localStorage.setItem(VEGETARIAN_KEY, "false");
    localStorage.setItem(GLUTEN_FREE_KEY, "false");
    localStorage.setItem(DAIRY_FREE_KEY, "false");
  };

  const getAIRecipe = async (params?: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchAIRecipe({ cuisine: params?.cuisine, mainIngredient: params?.mainIngredient, reset: resetAll });
      setRecipe(response);
      setResetAll(false);
    } catch (error) {
      setError(ERROR_DEFAULT);
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && <LoadingComponent />}
      {error && <ErrorModal text={error} show={!!error} onClose={() => setError(null)} />}
      
      {!recipe && !loading && (
        <div>
          <div className="header">{HEADER_TEXT}</div>
          <AnimatedHeader />
          <h2>{SUBHEADER_TEXT}</h2>
          <AnimatedButton text={getRecipeButtonPrompt} onClick={() => getAIRecipe()} />
        </div>
      )}

      {recipe && !loading && (
        <div>
          <button className="resetButton" onClick={reset}>Reset</button>
          <div className="toggleContainer">
            <Toggle initialState={isVegetarian} onToggle={() => setIsVegetarian(!isVegetarian)} label="Vegetarian" />
            <Toggle initialState={isGlutenFree} onToggle={() => setIsGlutenFree(!isGlutenFree)} label="Gluten-Free" />
            <Toggle initialState={isDairyFree} onToggle={() => setIsDairyFree(!isDairyFree)} label="Dairy-Free" />
          </div>
          <HowAboutPrompt />
          <RecipeComponent title={recipe.recipe.title} onClick={() => setIsShowRecipe(true)} />
          <ButtonOptionsAI getRecipe={getAIRecipe} recipe={recipe.recipe} />
          <RecipeFiltering params={recipe.params} />
          <RecipeDisplay recipe={recipe.recipe} isOpen={isShowRecipe} onClose={() => setIsShowRecipe(false)} />
        </div>
      )}

      <div className="footer">Lisa Marie Herzberg ©2024</div>
    </div>
  );
};

export default RandomRecipeGenerator;
