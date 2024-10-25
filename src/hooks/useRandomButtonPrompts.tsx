interface Recipe {
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
      availableStrings.splice(randomIndex, 1);
    }
  
    return result;
  };
  
  export default useRandomButtonPrompts;
  