import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

export const getRandomRecipe = async (req: Request, res: Response) => {
    
  let url= `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&include-tags=dinner`;

  try {
    // const response = await axios.get(url);
    res.json({
      message: 'Random recipes fetched successfully',
      data: {recipes: [mockRecipe]},
    });
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    res.status(500).json({ message: 'Failed to fetch random recipes' });
  }
};


const mockRecipe =  {
    id: 715538,
    title: "Spaghetti with Garlic, Kale, and Tomatoes",
    image: "https://spoonacular.com/recipeImages/715538-556x370.jpg",
    imageType: "jpg",
    servings: 2,
    readyInMinutes: 25,
    license: "CC BY-SA 3.0",
    sourceName: "Full Belly Sisters",
    sourceUrl: "http://fullbellysisters.blogspot.com/2014/09/spaghetti-with-garlic-kale-and-tomatoes.html",
    spoonacularSourceUrl: "https://spoonacular.com/spaghetti-with-garlic-kale-and-tomatoes-715538",
    aggregateLikes: 228,
    healthScore: 25,
    spoonacularScore: 90,
    pricePerServing: 1.72,
    analyzedInstructions: [
      {
        name: "",
        steps: [
          {
            number: 1,
            step: "Cook the spaghetti according to package instructions. Drain and set aside.",
            ingredients: [
              {
                id: 20420,
                name: "spaghetti",
                localizedName: "spaghetti",
                image: "https://spoonacular.com/cdn/ingredients_100x100/spaghetti.jpg"
              }
            ],
            equipment: []
          },
          {
            number: 2,
            step: "In a large pan, heat the olive oil over medium heat. Add the garlic and sauté for about 1 minute.",
            ingredients: [
              {
                id: 4053,
                name: "olive oil",
                localizedName: "olive oil",
                image: "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg"
              },
              {
                id: 11215,
                name: "garlic",
                localizedName: "garlic",
                image: "https://spoonacular.com/cdn/ingredients_100x100/garlic.jpg"
              }
            ],
            equipment: [
              {
                id: 404645,
                name: "pan",
                localizedName: "pan",
                image: "https://spoonacular.com/cdn/equipment_100x100/pan.png"
              }
            ]
          },
          {
            number: 3,
            step: "Add the kale and cook for about 3 minutes until softened.",
            ingredients: [
              {
                id: 11233,
                name: "kale",
                localizedName: "kale",
                image: "https://spoonacular.com/cdn/ingredients_100x100/kale.jpg"
              }
            ],
            equipment: []
          },
          {
            number: 4,
            step: "Add the cherry tomatoes and cook for another 3-4 minutes.",
            ingredients: [
              {
                id: 10311529,
                name: "cherry tomatoes",
                localizedName: "cherry tomatoes",
                image: "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.jpg"
              }
            ],
            equipment: []
          },
          {
            number: 5,
            step: "Toss the spaghetti into the pan and mix well. Serve hot.",
            ingredients: [],
            equipment: [
              {
                id: 404645,
                name: "pan",
                localizedName: "pan",
                image: "https://spoonacular.com/cdn/equipment_100x100/pan.png"
              }
            ]
          }
        ]
      }
    ],
    nutrition: {
      nutrients: [
        {
          name: "Calories",
          amount: 507.55,
          unit: "kcal"
        },
        {
          name: "Carbohydrates",
          amount: 78.58,
          unit: "g"
        },
        {
          name: "Protein",
          amount: 15.47,
          unit: "g"
        },
        {
          name: "Fat",
          amount: 14.53,
          unit: "g"
        },
        {
          name: "Fiber",
          amount: 9.24,
          unit: "g"
        }
      ]
    },
    diets: ["vegetarian", "dairy free"],
    dishTypes: ["lunch", "main course", "main dish", "dinner"],
    cuisines: ["Italian"],
    occasions: [],
    winePairing: {
      pairedWines: ["chardonnay", "pinot noir", "sangiovese"],
      pairingText: "Spaghetti with Garlic, Kale, and Tomatoes works well with these wines: Chardonnay, Pinot Noir, and Sangiovese."
    }
  };
  