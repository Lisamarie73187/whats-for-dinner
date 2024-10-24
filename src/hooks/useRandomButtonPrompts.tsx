interface Recipe {
    cuisines: string[];
    dairyFree?: boolean;
    glutenFree?: boolean;
    vegan?: boolean;
    vegetarian?: boolean;
    dishTypes: string[];
    healthScore: number;
  }
  
  interface ButtonPrompt {
    prompt: string;
    params: {
        excludeCuisine?: string;
        intolerances?: string;
        diet?: string;
        type?: string;
        maxCalories?: number;
    };

  }
  
  const useRandomButtonPrompts = (recipe: Recipe): ButtonPrompt[] => {
    const buttonPromptArr: ButtonPrompt[] = [];
  
    console.log({recipe})
    if((recipe.cuisines ?? []).length > 0){
      buttonPromptArr.push({
        prompt: `I hate ${recipe.cuisines?.[0] ?? ''}`,
        params: { excludeCuisine: recipe?.cuisines[0] }
      });
    }
  
    if(!recipe.dairyFree){
      buttonPromptArr.push({
        prompt: 'I am lactose intolerant, no dairy please',
        params: {intolerances: 'dairy'}
      });
    }
  
    if(!recipe.glutenFree){
      buttonPromptArr.push({
        prompt: 'Gluten? Yeah, I don’t think so.',
        params: {intolerances: 'gluten'}
      });
    }
  
    if(!recipe.vegan){
      buttonPromptArr.push({
        prompt: 'If it mooed, clucked, or oinked, keep it away.',
        params: {diet: 'Vegan'}

      });
    }
  
    if(!recipe.vegetarian){
      buttonPromptArr.push({
        prompt: 'I don’t eat anything with a face.',
        params: {diet: 'Vegetarian'}

      });
    }
  
    if(recipe.dishTypes.length > 0){
      const morningTarget = ['morning meal', 'breakfast', 'brunch'];
      const containsTarget = recipe.dishTypes.some(meal => morningTarget.includes(meal));
      
      if (containsTarget) {
        buttonPromptArr.push({
          prompt: 'Look outside—morning left hours ago.',
          params: {type: 'main course'}
        });
      }
    }

    if(recipe.healthScore < 50){
        buttonPromptArr.push({
            prompt: 'I am trying to be healthy, give me something else',
            params: {maxCalories: 500}
        })
    }
    
    return getRandomStringsArray(buttonPromptArr, 2);
  };
  
  const getRandomStringsArray = (strings: ButtonPrompt[], numOfStrings: number): ButtonPrompt[] => {
    if (strings.length < numOfStrings) {
      return strings;
    }
  
    const availableStrings = [...strings];
    const result: ButtonPrompt[] = [];
  
    for (let i = 0; i < numOfStrings; i++) {
      const randomIndex = Math.floor(Math.random() * availableStrings.length);
      result.push(availableStrings[randomIndex]);
      availableStrings.splice(randomIndex, 1);  // Remove the selected string
    }
  
    return result;
  };
  
  export default useRandomButtonPrompts;
  