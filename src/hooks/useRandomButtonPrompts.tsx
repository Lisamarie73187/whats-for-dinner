import { promptsForCuisine, promptsForMealType } from "../prompts";

  
interface ButtonPrompt {
    prompt: string;
    params: {
      cuisineType?: string;
      health?: string;
      mealType?: string;
  };
}
  
  const useRandomButtonPrompts = (queries: string): ButtonPrompt[] => {
    const buttonPromptArr: ButtonPrompt[] = [];
    const queriesObj = queryStringToObject(queries);

    if(queriesObj.cuisineType) {
      buttonPromptArr.push({
        prompt: createPrompt(queriesObj.cuisineType, promptsForCuisine),
        params: {
          cuisineType: queriesObj.cuisineType,
        },
      });
    }

    if(queriesObj.q) {
      buttonPromptArr.push({
        prompt: createPrompt(queriesObj.q, promptsForMealType),
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
    return queryString
        .split('&')  
        .reduce((acc, param) => { 
            const [key, value] = param.split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
    }, {});
  }
   
const createPrompt = (inputString, prompts) => {
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  
  return `${inputString} ${randomPrompt}`;
};

  export default useRandomButtonPrompts;
  