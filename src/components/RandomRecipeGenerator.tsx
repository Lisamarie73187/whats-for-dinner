import React, { useState, useEffect } from 'react';
import ButtonOptions from './ButtonOptions';
import LoadingComponent from './LoadingCompontent';
import HowAboutPrompt from './HowAboutPrompt';
import { fetchRecipe } from '../api/fetchRecipe';
import useRandomGetRecipeButtonPrompts from '../hooks/useRandomGetRecipePrompt';
import useRandomPrompt from '../hooks/useRandomPrompt';
import { errorMessages } from '../prompts';
import ErrorModal from './ErrorModal';
import Toggle from './Toggle';
import AnimatedHeader from './AnimatedHeader';
import AnimatedButton from './AnimatedButton';
import Recipe from './Recipe';

interface Recipe {
  id: number;
  label: string;
  image: string;
  url: string;
}

const STORAGE_KEY = "isVegetarian";
const HEADER_TEXT = "FOOD CO";
const SUBHEADER_TEXT = "Your go-to guide on feeding yourself";
const ERROR_DEFAULT = "Oops! Something went wrong. Please try again later, maybe too many calls on this free API I am using. Sorry!";
const TOGGLE_LABEL = "Vegetarian";

const RandomRecipeGenerator: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [queries, setQueries] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isVegetarian, setIsVegetarian] = useState(() => {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    return storedValue === "true";
  });

  const getRecipeButtonPrompt = useRandomGetRecipeButtonPrompts();
  const errorPrompt = useRandomPrompt(errorMessages);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isVegetarian));
  }, [isVegetarian]);

  const getRecipe = async (params?: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchRecipe(params);
      setRecipe(response.recipe);
      setQueries(response.queries);
    } catch (error) {
      setError(
        (error as Error).message === 'Recipes Filtered Too Much'
          ? errorPrompt
          : ERROR_DEFAULT
      );
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
          <AnimatedButton text={getRecipeButtonPrompt} onClick={() => getRecipe()} />
        </div>
      )}
      {recipe && !loading && (
        <div>
          <Toggle
            initialState={isVegetarian}
            onToggle={() => setIsVegetarian(!isVegetarian)}
            label={TOGGLE_LABEL}
          />
          <HowAboutPrompt />
          <Recipe label={recipe.label} image={recipe.image} url={recipe.url} />
          <ButtonOptions getRecipe={getRecipe} recipe={recipe} queries={queries} />
        </div>
      )}
    </div>
  );
};

export default RandomRecipeGenerator;
