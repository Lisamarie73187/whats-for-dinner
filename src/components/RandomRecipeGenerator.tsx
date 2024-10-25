import React, { useState } from 'react';
import { fetchRandomRecipe } from '../api/fetchRandomRecipe';
import ButtonOptions from './ButtonOptions';
import LoadingComponent from './LoadingCompontent';
import HowAboutPrompt from './HowAboutPrompt';
import { fetchRecipe } from '../api/fetchRecipe';
import useRandomGetRecipeButtonPrompts from '../hooks/useRandomGetRecipePrompt';

interface Recipe {
  id: number;
  label: string;
  image: string;
  }

const RandomRecipeGenerator: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const getRecipeButtonPrompt = useRandomGetRecipeButtonPrompts();

  // const getRandomRecipe = async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetchRandomRecipe();
  //     setRecipe(response.recipes[0]);
  //   } catch (error) {
  //     console.error('Error fetching recipe:', error);
  //     setError('Error fetching random recipe');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getRecipe = async (params: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchRecipe(params);
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
            <div style={styles.header}>FOOD CO</div>
            <h1 style={styles.heading}>WTF Should I Make <br/>for Dinner?</h1>
            <div style={styles.subheader}>Your go to guide on feeding yourself</div>
            <button style={styles.button} onClick={getRecipe}>{getRecipeButtonPrompt}</button>
          </div>
        )
      }
      {recipe && !loading ? (
        <div>
           <HowAboutPrompt/>
          <div style={styles.recipeContainer}>
            <div style={styles.recipeTitle}>{recipe.label}</div>
            <img src={recipe.image} alt={recipe.label} style={styles.recipeImage} />
          </div>
        </div>
      ) : (
        <div style={styles.recipeContainerLoading}>
            <div style={styles.recipeImageLoading}/>
          </div>
      )}
      {recipe && !loading &&  <ButtonOptions getRecipe={getRecipe} recipe={recipe}/>}
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
  heading: {
    fontSize: '8rem',
    color: '#fffbf6',
    fontFamily: "Irish Grover",
    fontWeight: "Regular",
    fontStyle: "normal",
    marginTop: '60px',
  },
  subheader: {
    fontFamily: "open sans",
    fontStyle: "normal",
    fontSize: '30px',
    color: '#fffbf6',
    marginTop: '130px',
  },
  button: {
    backgroundColor: '#fffbf6',
    color: '#333',
    border: 'none',
    padding: '10px 20px',
    fontSize: '20px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    fontFamily: "open sans",
    marginTop: '30px',
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
    color: '#fffbf6',
    marginBottom: '20px',
  },
  recipeImage: {
    width: '400px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
};


export default RandomRecipeGenerator;
