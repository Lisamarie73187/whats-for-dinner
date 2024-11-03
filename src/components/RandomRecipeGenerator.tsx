import React, { useState, useCallback } from 'react';
import ButtonOptionsAI from './ButtonOptionsAI';
import LoadingComponent from './LoadingCompontent';
import HowAboutPrompt from './HowAboutPrompt';
import { fetchAIRecipe } from '../api/fetchAIRecipes';
import useRandomGetRecipeButtonPrompts from '../hooks/useRandomGetRecipePrompt';
import ErrorModal from './ErrorModal';
import AnimatedHeader from './AnimatedHeader';
import AnimatedButton from './AnimatedButton';
import RecipeComponent from './Recipe';
import RecipeFiltering from './RecipeFiltering';
import RecipeDisplay from './RecipeDisplay';
import { recipeResponse } from '../../types/types';
import WhatsInMyFridgeModal from './WhatsInMyFridgeModal';
import DietaryRestrictionsModal from './DietaryRestrictionsModal';

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
  const [isShowFridgeModal, setIsShowFridgeModal] = useState<boolean>(false);
  const [isShowDietaryRestrictionsModal, setIsShowDietaryRestrictionsModal] = useState<boolean>(false);

  const getRecipeButtonPrompt = useRandomGetRecipeButtonPrompts();

  const getAIRecipe = useCallback(async (params?: any) => {
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

  const closeFridgeModalAndGetNewRecipe = useCallback(() => {
    setIsShowFridgeModal(false);
    getAIRecipe();
  }, [getAIRecipe]);

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
          <HowAboutPrompt />
          <RecipeComponent title={recipe.recipe.title} onClick={() => setIsShowRecipe(true)} />
          <ButtonOptionsAI getRecipe={getAIRecipe} recipe={recipe.recipe} />
          <div className='filterButtons'>
            <AnimatedButton text={'What\'s In Your Fridge?'} onClick={() => setIsShowFridgeModal(true)}/>
            <AnimatedButton text={'Dietary Restrictions?'} onClick={() => setIsShowDietaryRestrictionsModal(true)}/>
          </div>
          <RecipeDisplay recipe={recipe.recipe} isOpen={isShowRecipe} onClose={() => setIsShowRecipe(false)} />
          <WhatsInMyFridgeModal isOpen={isShowFridgeModal} onClose={closeFridgeModalAndGetNewRecipe} />
          <DietaryRestrictionsModal isOpen={isShowDietaryRestrictionsModal} onClose={() => setIsShowDietaryRestrictionsModal(false)} />
          <RecipeFiltering params={recipe.params} />
        </div>
      )}
      <div className="footer">Lisa Marie Herzberg ©2024</div>
    </div>
  );
};

export default RandomRecipeGenerator;
