import React, { useState } from 'react';
import { fetchRandomRecipe } from '../api/fetchRandomRecipe';

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
      setRecipe(response.results[0]);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setError('Error fetching random recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>WTF Should I Make for Dinner?</h1>
      <div>
        <button style={styles.button} onClick={getRandomRecipe}>Get Random Recipe</button>
      </div>
      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {recipe && (
        <div style={styles.recipeContainer}>
          <div style={styles.recipeTitle}>{recipe.title}</div>
          <img src={recipe.image} alt={recipe.title} style={styles.recipeImage} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
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
  loading: {
    fontSize: '1.2rem',
    color: '#555',
    marginTop: '20px',
  },
  error: {
    fontSize: '1.2rem',
    color: 'red',
    marginTop: '20px',
  },
  recipeContainer: {
    marginTop: '30px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textAlign: 'center' as const,
  },
  recipeTitle: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '10px',
  },
  recipeImage: {
    width: '500px',
    borderRadius: '10px',
    marginBottom: '10px',
  },
};


export default RandomRecipeGenerator;
