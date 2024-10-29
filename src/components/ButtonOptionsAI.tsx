import React, { useRef }   from 'react';
import useRandomPrompt from '../hooks/useRandomPrompt';
import { promptsForNoThanks } from '../prompts';
import AnimatedSelection from './AnimatedSelection';
import { promptProps } from '../../types/types';

interface ButtonOptionsProps {
    getRecipe: (queries?: any) => void;
    recipe: any;
    mainIngredient?: promptProps;
    cuisine?: promptProps;
}

const ButtonOptionsAI: React.FC<ButtonOptionsProps> = ({ getRecipe, recipe }) => {
    const randomLoadingPrompt = useRef(useRandomPrompt(promptsForNoThanks));
    
    return (
        <div className={`button-container-base`}>
            <AnimatedSelection text={randomLoadingPrompt.current} onClick={() => getRecipe()} />
            {recipe.mainIngredient && (
              <AnimatedSelection text={recipe.mainIngredient.prompt} onClick={() => getRecipe({mainIngredient: recipe.mainIngredient.type})} /> 
            )}
            {recipe.cuisine && (
            <AnimatedSelection text={recipe.cuisine.prompt} onClick={() => getRecipe({cuisine: recipe.cuisine.type})} /> 
            )}
        </div>
    );
};

export default ButtonOptionsAI;


