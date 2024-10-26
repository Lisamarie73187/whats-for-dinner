import { promptsMainButton } from "../prompts";

const useRandomGetRecipeButtonPrompts = () => {
    const randomIndex = Math.floor(Math.random() * promptsMainButton.length);
    return promptsMainButton[randomIndex];
  };

export default useRandomGetRecipeButtonPrompts;