import React, { useState, useEffect } from 'react';
import ButtonOptions from './ButtonOptions';
import LoadingComponent from './LoadingCompontent';
import HowAboutPrompt from './HowAboutPrompt';
import { fetchRecipe } from '../api/fetchRecipe';
import useRandomGetRecipeButtonPrompts from '../hooks/useRandomGetRecipePrompt';
import { Button } from './Button';
import useRandomPrompt from '../hooks/useRandomPrompt';
import { errorMessages } from '../prompts';
import  ErrorModal  from './ErrorModal';
import Toggle from './Toggle';
import AnimatedText from './AnimatedText';
import AnimatedButton from './AnimatedButton';

interface Recipe {
  id: number;
  label: string;
  image: string;
  url: string;
  }

const RandomRecipeGenerator: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [queries, setQueries] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isVegetarian, setIsVegetarian] = useState(() => {
    const storedValue = localStorage.getItem("isVegetarian");
    return storedValue === "true";
});

  const getRecipeButtonPrompt = useRandomGetRecipeButtonPrompts();
  const errorPrompt = useRandomPrompt(errorMessages);

  useEffect(() => {
    localStorage.setItem("isVegetarian", JSON.stringify(isVegetarian));
}, [isVegetarian]);

  const getRecipe = async (params?: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchRecipe(params);
      setRecipe(response.recipe);
      setQueries(response.queries);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setError(errorPrompt);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {loading && <LoadingComponent/>}
      {<ErrorModal text={errorPrompt} show={error} onClose={() => setError(null)}/> }
      {!recipe && !loading && (
          <div>
            <div style={styles.header}>FOOD CO</div>
            <AnimatedText/>
            <h2>Your go to guide on feeding yourself</h2>
            <AnimatedButton text={getRecipeButtonPrompt} onClick={getRecipe}/>
          </div>
        )
      }
      {recipe && !loading && (
        <div>
          <Toggle initialState={isVegetarian} onLabel='Vegetarian' offLabel='Not Vegetarian' onToggle={() => setIsVegetarian(!isVegetarian)}/>
           <HowAboutPrompt/>
          <div style={styles.recipeContainer} onClick={() => window.open(`${recipe.url}`, "_blank")}>
            <div style={styles.recipeTitle}>{recipe.label}</div>
            <img src={recipe.image} alt={recipe.label} style={styles.recipeImage} />
          </div>
          <ButtonOptions getRecipe={getRecipe} recipe={recipe} queries={queries}/>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '20px',
  },
  header: {
    fontFamily: "Young Serif",
    fontWeight: "Bold",
    fontStyle: "normal",
    fontSize: '20px',
    color: '#fffbf6',
  },
  error: {
    fontSize: '1.2rem',
    color: 'red',
    marginTop: '20px',
  },
  recipeContainer: {
    height: '400px',
    marginTop: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textAlign: 'center' as const,
    cursor: 'pointer',
  },
  recipeTitle: {
    fontSize: '1.8rem',
    color: '#fffbf6',
    marginBottom: '20px',
  },
  recipeImage: {
    width: '350px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
};


export default RandomRecipeGenerator;
