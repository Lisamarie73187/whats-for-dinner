import React, { useState } from 'react';
import ButtonOptions from './ButtonOptions';
import LoadingComponent from './LoadingCompontent';
import HowAboutPrompt from './HowAboutPrompt';
import { fetchRecipe } from '../api/fetchRecipe';
import useRandomGetRecipeButtonPrompts from '../hooks/useRandomGetRecipePrompt';
import { Button } from './Button';
import useRandomPrompt from '../hooks/useRandomPrompt';
import { errorMessages } from '../prompts';
import  ErrorModal  from './ErrorModal';

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
  const getRecipeButtonPrompt = useRandomGetRecipeButtonPrompts();
  const errorPrompt = useRandomPrompt(errorMessages);

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
            <h1>WTF Should I Make <br/>for Dinner?</h1>
            <div style={styles.subheader}>Your go to guide on feeding yourself</div>
            <Button text={getRecipeButtonPrompt} onClick={getRecipe}/>
            <Button text={'Error'} onClick={() => setError(errorPrompt)}/>
          </div>
        )
      }
      {recipe && !loading && (
        <div>
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
  subheader: {
    fontFamily: "open sans",
    fontStyle: "normal",
    fontSize: '30px',
    color: '#fffbf6',
    marginTop: '130px',
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
