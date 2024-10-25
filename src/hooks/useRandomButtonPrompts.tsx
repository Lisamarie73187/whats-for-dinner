import { CuisineType, DietType, MealType } from "../../types/types";

interface Recipe {
  cuisineType: CuisineType[];
  dietType: DietType[];
  mealType: MealType[];
  }
  
interface ButtonPrompt {
    prompt: string;
    params: {
      cuisineType?: string;
      dietType?: string;
      mealType?: string;
  };
}
  
  const useRandomButtonPrompts = (queries: string): ButtonPrompt[] => {
    const buttonPromptArr: ButtonPrompt[] = [];
    const queriesObj = queryStringToObject(queries);

    if(queriesObj.cuisineType) {
      buttonPromptArr.push({
        prompt: `gross I hate ${queriesObj.cuisineType}`,
        params: {
          cuisineType: queriesObj.cuisineType,
        },
      });
    }

    if(queriesObj.q) {
      buttonPromptArr.push({
        prompt: `I don't like ${queriesObj.q}`,
        params: {
          mealType: queriesObj.q,
        },
      });
    }

    return getRandomStringsArray(buttonPromptArr, 3);
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

  export const queryStringToObject = (queryString) => {
    console.log('queryString:', queryString);
    return queryString
        .split('&')                       // Split the string by '&'
        .reduce((acc, param) => {         // Iterate over each parameter
            const [key, value] = param.split('='); // Split by '=' to get key and value
            acc[key] = decodeURIComponent(value);  // Decode and assign to object
            return acc;
    }, {});                           // Start with an empty object
}
   

  export default useRandomButtonPrompts;
  