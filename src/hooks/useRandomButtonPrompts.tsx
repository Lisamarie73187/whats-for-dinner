  
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
        prompt: createPrompt(queriesObj.cuisineType, cuisinePrompts),
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
   
const promptsForMealType = [
  "is like chewing on sadness and disappointment!",
  "tastes like regret and broken dreams!",
  "feels like a betrayal to my taste buds!",
  "is basically a flavor crime!",
  "is as appealing as a soggy gym sock!",
  "is what my nightmares taste like!",
];

const cuisinePrompts = [
  "is like a culinary vacation in the wrong country!",
  "tastes like someone tried cooking with Google Translate instructions!",
  "is what happens when spices get confused!",
  "might make Nonna cry, and not in a good way.",
  "is as authentic as fast food with a fancy name.",
  "is like a dish with all the wrong subtitles!",
  "could be amazing, but somehow misses the exit to flavor town."
];

const createPrompt = (inputString, prompts) => {
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  
  return `${inputString} ${randomPrompt}`;
};

  export default useRandomButtonPrompts;
  