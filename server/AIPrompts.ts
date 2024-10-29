export const randomRecipePrompt = `
Generate a random, unique dinner recipe with easy-to-find 
ingredients and simple instructions. 
Make it something creative and fun!
can you return the main ingredient and the cuisine too.

Please generate a recipe with the following structure:

{
  "title": "Recipe Title",
  "cuisine": {
    "type": "Cuisine type",
    prompt: "return a random rude comment about how you dont want the cuisine"
  },
  "mainIngredient": {
    type: "Main ingredient type",
    prompt: "return a random rude comment about how you dont want the main ingredient"
  }
  "ingredients": [
      { "item": "Other ingredient name", "amount": "quantity" }
    ],
  "instructions": [
    "Step 1 instruction.",
    "Step 2 instruction.",
    "..."
  ]
}
`

  export const createRecipePrompt = (
    ingredients?: string,
    cuisineTypeString?: string,
    mainIngredient?: string,
    mainIngredientString?: string
  ): string => `
    Create a recipe that uses the following ingredients: ${ingredients || 'any available ingredients'}.
    no not include: ${cuisineTypeString || 'none'}
    do not include anything with: ${mainIngredient || 'none'}
    Dietary restrictions: ${mainIngredientString || 'none'}
    Generate a random, unique dinner recipe with easy-to-find 
    ingredients and simple instructions. 
    can you return the main ingredient and the cuisine too.
    Please generate a recipe with the following structure:
    {
      "title": "Recipe Title",
      "cuisine": {
        "type": "Cuisine type",
        "prompt": "return a random rude comment about how you don't want the cuisine"
      },
      "mainIngredient": {
        "type": "Main ingredient type",
        "prompt": "return a random rude comment about how you don't want the main ingredient"
      },
      "ingredients": [
        { "item": "Other ingredient name", "amount": "quantity" }
      ],
      "instructions": [
        "Step 1 instruction.",
        "Step 2 instruction.",
        "..."
      ]
    }
  `;
  
