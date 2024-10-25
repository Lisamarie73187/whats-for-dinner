import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

export const getRecipe = async (req: Request, res: Response) => {
    
  let baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&number=1&sort=random&type="main course"`;

  const queryParams = new URLSearchParams(req.query as Record<string, string>).toString();

  const url = `${baseUrl}&${queryParams}`; 
  try {
    // const response = await axios.get(url);
    const recipe = response.data.results[0];

    if (!recipe) {
      return res.status(404).json({ message: 'No recipe found' });
    }

    const recipeId = recipe.id; 

    const detailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`;
    const data = recipeMock;

    res.json({
      message: 'Random recipe and details fetched successfully',
      data,
    });

  } catch (error) {
    console.error('Error fetching random recipe or recipe details:', error);
    res.status(500).json({ message: 'Failed to fetch random recipe or recipe details' });
  }
};


const response = { data: {
  results: [
    {
      id: 716429,
      title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      image: "https://spoonacular.com/recipeImages/716429-312x231.jpg",
      imageType: "jpg"
    }
  ],
  offset: 0,
  number: 5,
  totalResults: 5213
}
}


const recipeMock = {
  id: 716429,
  title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
  image: "https://img.spoonacular.com/recipes/716429-556x370.jpg",
  servings: 2,
  readyInMinutes: 45,
  cookingMinutes: 25,
  preparationMinutes: 20,
  sourceName: "Full Belly Sisters",
  sourceUrl: "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
  spoonacularSourceUrl: "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429",
  healthScore: 19.0,
  spoonacularScore: 83.0,
  pricePerServing: 163.15,
  cheap: false,
  dairyFree: false,
  glutenFree: false,
  ketogenic: false,
  lowFodmap: false,
  vegan: false,
  vegetarian: false,
  veryHealthy: false,
  veryPopular: false,
  whole30: false,
  weightWatcherSmartPoints: 17,
  dishTypes: ["lunch", "main course", "main dish", "dinner"],
  summary: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire...",
  winePairing: {
    pairedWines: ["chardonnay", "gruener veltliner", "sauvignon blanc"],
    pairingText: "Chardonnay, Gruener Veltliner, and Sauvignon Blanc are great choices for Pasta."
  }
};
