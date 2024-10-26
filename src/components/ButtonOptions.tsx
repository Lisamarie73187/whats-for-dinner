import React, { useRef } from 'react';
import useRandomPrompt from '../hooks/useRandomPrompt';
import useRandomButtonPrompts from '../hooks/useRandomButtonPrompts';
import { promptsForNoThanks } from '../prompts';
import AnimatedButton from './AnimatedButton';

interface ButtonOptionsProps {
    getRecipe: (queries?: any) => void;
    recipe: any;
    queries: any;
}

const ButtonOptions: React.FC<ButtonOptionsProps> = ({ getRecipe, queries }) => {
    // Store the prompts using useRef to keep them constant
    const randomLoadingPrompt = useRef(useRandomPrompt(promptsForNoThanks));
    const randomButtonPrompts = useRef(useRandomButtonPrompts(queries));

    return (
        <div style={styles.buttonContainer}>
            <AnimatedButton text={randomLoadingPrompt.current} onClick={() => getRecipe()} width={'20vw'} />
            {randomButtonPrompts.current.map((buttonPrompt, index) => (
                buttonPrompt.prompt && (
                    <AnimatedButton
                        key={index}
                        text={buttonPrompt.prompt}
                        onClick={() => getRecipe(buttonPrompt.params)}
                        width={'20vw'}
                    />
                )
            ))}
        </div>
    );
};

export default ButtonOptions;

const styles = {
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '70px',
        margin: '0 10vw',
    }
};
