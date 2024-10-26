import axios, { AxiosResponse } from 'axios';
import {  Request, Response } from 'express';
import { CuisineType, MealType } from '../../types/types';

interface Recipe {
  label: string;
  ingredientLines: string[];
  url: string;
  image: string;
}

interface RecipeHit {
  recipe: Recipe;
}

interface EdamamResponse {
  hits: RecipeHit[];
}

const appId: string = process.env.EDAMAM_API_ID as string;
const appKey: string = process.env.EDAMAM_API_KEY as string;

let cuisineOptions: string[] = [...Object.values(CuisineType)];
let mealOptions: string[] = [...Object.values(MealType)];

function getRandom(array: string[]): string {
  if (array.length === 0) return "";

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function generateRandomQueryParams(query: { cuisineType?: string; q?: string, vegetarian?: string }): string {
  const isVegetarian = query.vegetarian === 'true';
  let queryParams = "";

  if (isVegetarian) {
    queryParams = "health=vegetarian";
    mealOptions = []
  } else {
    mealOptions = [...Object.values(MealType)];
  }

  if (query.cuisineType) {
    cuisineOptions = cuisineOptions.filter(cuisine => cuisine !== query.cuisineType);
  }

  if (query.q) {
    mealOptions = mealOptions.filter(meal => meal !== query.q);
  }

  const randomCuisine = getRandom(cuisineOptions);
  const randomMeal = getRandom(mealOptions);

  if (randomCuisine) {
    queryParams += queryParams ? `&cuisineType=${randomCuisine}` : `cuisineType=${randomCuisine}`;
  }
  if (randomMeal) {
    queryParams += queryParams ? `&q=${randomMeal}` : `q=${randomMeal}`;
  } else {
    queryParams += queryParams ? `&q=main course` : `q=main course`;
  }

  return queryParams;
}


export const getRecipeEdamam = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = generateRandomQueryParams(req.query as { cuisineType: string; q: string });
    if (!query) {
      res.status(404).json({ message: 'No recipes found' });
      return;
    }  
     const url = `https://api.edamam.com/search?${query}&app_id=${appId}&app_key=${appKey}&mealType=dinner&dishType=main course&random=true&from=0&to=100`;

    const response: AxiosResponse<EdamamResponse> = await axios.get(url);

    const recipes: RecipeHit[] = response.data.hits;
    if (recipes?.length === 0) {
      res.status(404).json({ message: 'No recipes found' });
      return;
    }

    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomRecipe: Recipe = recipes[randomIndex].recipe;

    res.json({
      recipe: randomRecipe,
      queries: query
    });
 
    // res.json({
    //   recipe: recipe,
    //   queries: query
    // });

  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

const recipe = {
  uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_d2846414b0cc07b685dc089acd645885",
  label: "Teriyaki Salmon",
  image: "https://edamam-product-images.s3.amazonaws.com/web-img/172/1726685f6438d728d457e5d4ee24c36f.jpg",
  source: "Bon Appetit",
  url: "https://www.bonappetit.com/recipe/teriyaki-salmon",
  shareAs: "http://www.edamam.com/recipe/teriyaki-salmon-d2846414b0cc07b685dc089acd645885/recipe",
  yield: 8,
  calories: 1007.5521296000002,
  totalWeight: 525.5923700000001,
  totalTime: 0,
  cuisineType: ["nordic"],
  mealType: ["lunch/dinner"],
  dishType: ["main course"],
  dietLabels: ["Low-Carb"],
  healthLabels: [
    "Sugar-Conscious", 
    "Kidney-Friendly", 
    "Keto-Friendly", 
    "Pescatarian", 
    "Dairy-Free", 
    "Egg-Free"
  ],
  cautions: ["Sulfites"],
  ingredientLines: [
    "Kosher salt",
    "1 pound salmon fillet, cut into 8 pieces",
    "¼ cup Canal House Teriyaki Sauce (click for recipe)"
  ],
  ingredients: [
    { text: "Kosher salt", quantity: 0, measure: null, food: "Kosher salt", weight: 3.1535542200000006 },
    { text: "1 pound salmon fillet, cut into 8 pieces", quantity: 1, measure: "pound", food: "salmon", weight: 453.59237 },
    { text: "¼ cup Canal House Teriyaki Sauce (click for recipe)", quantity: 0.25, measure: "cup", food: "Teriyaki Sauce", weight: 68.84650500000001 }
  ],
  totalNutrients: {
    ENERC_KCAL: { label: "Energy", quantity: 1007.5521296000002, unit: "kcal" }
  },
  totalDaily: {
    ENERC_KCAL: { label: "Energy", quantity: 50.37760648000001, unit: "%" }
  },
  digest: [
    {
      label: "Fat",
      tag: "FAT",
      schemaOrgTag: "fatContent",
      total: 60.79577758000001,
      hasRDI: true,
      daily: 93.53273473846156,
      unit: "g"
    }
  ]
};