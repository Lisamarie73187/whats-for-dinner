export const randomRecipePrompt = `
Generate a random, unique dinner recipe with easy-to-find 
ingredients and simple instructions. 
Make it something creative and fun!

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
    dietaryRestrictions?: string
  ): string => `
    Create a recipe that uses some of the following ingredients but it doesn't have to use all the ingredients: ${ingredients || 'any available ingredients'}.
    Dietary restrictions: ${dietaryRestrictions || 'none'}
    Generate a random, unique dinner recipe with  
    ingredients and simple instructions. 
    
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
  
