import React, { useState } from 'react';
import { fetchRandomRecipe } from '../api/fetchRandomRecipe';
import ButtonOptions from './ButtonOptions';
import LoadingComponent from './LoadingCompontent';
import HowAboutPrompt from './HowAboutPrompt';
import { fetchSpecificRandomRecipe } from '../api/fetchSpecificRecipe';

interface Recipe {
  id: number;
  title: string;
  image: string;
  instructions: string;
}

const RandomRecipeGenerator: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomRecipe = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchRandomRecipe();
      setRecipe(response.recipes[0]);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setError('Error fetching random recipe');
    } finally {
      setLoading(false);
    }
  };

  const getRecipe = async (params: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchSpecificRandomRecipe(params);
      console.log({response})
      setRecipe(response);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setError('Error fetching recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {loading && <LoadingComponent/>}
      {error && <p style={styles.error}>{error}</p>}
      {!recipe && !loading && (
          <div>
            <h1 style={styles.heading}>WTF Should I Make <br/>for Dinner?</h1>
            <button style={styles.button} onClick={getRandomRecipe}>Get Random Recipe</button>
          </div>
        )
      }
      {recipe && !loading ? (
        <div>
           <HowAboutPrompt/>
          <div style={styles.recipeContainer}>
            <div style={styles.recipeTitle}>{recipe.title}</div>
            <img src={recipe.image} alt={recipe.title} style={styles.recipeImage} />
          </div>
        </div>
      ) : (
        <div style={styles.recipeContainerLoading}>
            <div style={styles.recipeImageLoading}/>
          </div>
      )}
      {recipe && !loading &&  <ButtonOptions getRandomRecipe={getRandomRecipe} getSpecificRecipe={getRecipe} recipe={recipe}/>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '20px',
  },
  heading: {
    fontSize: '8rem',
    color: '#333',
    marginBottom: '20px',
    fontFamily: "Irish Grover",
    fontWeight: "Regular",
    fontStyle: "normal",
  },
  button: {
    backgroundColor: '#ff5722',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
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
  },
  recipeContainerLoading: {
    height: '400px',
  },
  recipeImageLoading: {
    height: '400px',
  },
  recipeTitle: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '20px',
  },
  recipeImage: {
    width: '500px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
};


export default RandomRecipeGenerator;
