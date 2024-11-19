import React from 'react';
import AnimatedHeader from './AnimatedHeader';
import AnimatedButton from './AnimatedButton';
import useRandomGetRecipeButtonPrompts from '../hooks/useRandomGetRecipePrompt';

interface MainScreenProps {
    getAIRecipe: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ getAIRecipe }) => {
    const recipeButtonPrompt = useRandomGetRecipeButtonPrompts();

    return (
        <div>
        <div className="header">"FOOD CO"</div>
        <AnimatedHeader />
        <h2>"Your go-to guide on feeding yourself"</h2>
        <AnimatedButton text={recipeButtonPrompt} onClick={getAIRecipe} />
      </div>
    );
};

export default MainScreen;