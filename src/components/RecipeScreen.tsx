import React, { useState, useCallback } from 'react';
import HowAboutPrompt from './HowAboutPrompt';
import Recipe from './Recipe';
import AnimatedSelection from './AnimatedSelection';
import useRandomPrompt from '../hooks/useRandomPrompt';
import AnimatedButton from './AnimatedButton';
import { promptsForNoThanks } from '../prompts';
import RecipeDisplay from './RecipeDisplay';
import WhatsInMyFridgeModal from './WhatsInMyFridgeModal';
import DietaryRestrictionsModal from './DietaryRestrictionsModal';

interface RecipeScreenProps {
    reset: () => void;
    recipe: any;
    getAIRecipe: () => void;
}

const RecipeScreen: React.FC<RecipeScreenProps> = ({ reset, recipe, getAIRecipe}) => {
    const [isShowRecipe, setIsShowRecipe] = useState<boolean>(false);
    const [isShowFridgeModal, setIsShowFridgeModal] = useState<boolean>(false);
    const [isShowDietaryRestrictionsModal, setIsShowDietaryRestrictionsModal] = useState<boolean>(false);

    const randomLoadingPrompt = useRandomPrompt(promptsForNoThanks);

    const closeFridgeModalAndGetNewRecipe = useCallback(() => {
        setIsShowFridgeModal(false);
        getAIRecipe();
      }, [getAIRecipe]);

    return (
        <div>
        <button className="resetButton" onClick={reset}>Reset</button>
        <HowAboutPrompt />
        <Recipe title={recipe.recipe.title} onClick={() => setIsShowRecipe(true)} />
         <div className="button-container-base">
            <AnimatedSelection text={randomLoadingPrompt} onClick={getAIRecipe} />
        </div>
        <div className='filterButtons'>
          <AnimatedButton text={'What\'s In Your Fridge?'} onClick={() => setIsShowFridgeModal(true)}/>
          <AnimatedButton text={'Dietary Restrictions?'} onClick={() => setIsShowDietaryRestrictionsModal(true)}/>
        </div>
        <RecipeDisplay recipe={recipe.recipe} isOpen={isShowRecipe} onClose={() => setIsShowRecipe(false)} />
        <WhatsInMyFridgeModal isOpen={isShowFridgeModal} onClose={closeFridgeModalAndGetNewRecipe} />
        <DietaryRestrictionsModal isOpen={isShowDietaryRestrictionsModal} onClose={() => setIsShowDietaryRestrictionsModal(false)} />
      </div>
    );
};

export default RecipeScreen;