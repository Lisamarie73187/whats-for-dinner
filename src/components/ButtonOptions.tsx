import React  from 'react';
import useRandomPrompt from '../hooks/useRandomPrompt';
import useRandomButtonPrompts from '../hooks/useRandomButtonPrompts';
import { promptsForNoThanks } from '../prompts';
import AnimatedSelection from './AnimatedSelection';

interface ButtonOptionsProps {
    getRecipe: (queries?: any) => void;
    recipe: any;
    queries: any;
}

const ButtonOptions: React.FC<ButtonOptionsProps> = ({ getRecipe, queries }) => {
    const randomLoadingPrompt = useRandomPrompt(promptsForNoThanks);
    const randomButtonPrompts = useRandomButtonPrompts(queries);

    return (
        <div className={`button-container-base ${randomButtonPrompts.length === 1 ? 'button-container-two-prompts' : 'button-container'}`}>
            <AnimatedSelection text={randomLoadingPrompt} onClick={() => getRecipe()} />
                {randomButtonPrompts.map((buttonPrompt, index) => (
                    buttonPrompt.prompt && (
                        <AnimatedSelection
                            key={index}
                            text={buttonPrompt.prompt}
                            onClick={() => getRecipe(buttonPrompt.params)}
                        />
                    )
                ))}
        </div>
    );
};

export default ButtonOptions;
