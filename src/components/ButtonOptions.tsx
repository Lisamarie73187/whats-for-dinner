import React, { useState } from 'react';
import useRandomPrompt from '../hooks/useRandomPrompt';
import useRandomButtonPrompts from '../hooks/useRandomButtonPrompts';
import { Button } from './Button';
import { promptsForNoThanks } from '../prompts';

interface ButtonOptionsProps {
    getRecipe: (queries?: any) => void;
    recipe: any;
    queries: any;
}


const ButtonOptions: React.FC<ButtonOptionsProps> = ({  getRecipe, queries }) => {
    const randomLoadingPrompt = useRandomPrompt(promptsForNoThanks);
    const randomButtonPrompt = useRandomButtonPrompts(queries)

    return (
        <div style={styles.buttonContainer}>
            <Button text={randomLoadingPrompt} onClick={() => getRecipe()} width={'20vw'}/>
            {randomButtonPrompt.map((buttonPrompt, index) => (
                buttonPrompt.prompt && <Button key={index} text={buttonPrompt.prompt} onClick={() => getRecipe(buttonPrompt.params)} width={'20vw'}/>
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
