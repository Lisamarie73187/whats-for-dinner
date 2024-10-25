import React from 'react';
import useRandomPrompt from '../hooks/useRandomPrompt';
import useRandomButtonPrompts from '../hooks/useRandomButtonPrompts';

interface ButtonOptionsProps {
    getRecipe: (buttonPrompt?: any) => void;
    recipe: any;
}

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const hateItButtonPrompts = [
    'Yikes, did that crawl out of a dumpster?, no thanks',
    'I would rather eat a shoe.',
    'My eyes are offended., something else please',
    'I wouldn\'t feed that to my worst enemy.',
    'Is it supposed to look like that?, give me something else',
    'Well, that’s one way to ruin my appetite.',
    'My taste buds are crying just thinking about it.',
    'Next, please!',
    'Try again. I’m not impressed.',
    'Got anything better?'
];


const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    
    
    return (
        <button onClick={onClick} style={styles.button}>
            {text}
        </button>
    );
};

const ButtonOptions: React.FC<ButtonOptionsProps> = ({  getRecipe, recipe }) => {
    const randomLoadingPrompt = useRandomPrompt(hateItButtonPrompts);
    // const randomButtonPrompt = useRandomButtonPrompts(recipe)
    return (
        <div style={styles.buttonContainer}>
            <Button text={randomLoadingPrompt} onClick={getRecipe} />
            {/* {randomButtonPrompt.map((buttonPrompt, index) => (
                <Button key={index} text={buttonPrompt.prompt} onClick={() => getRecipe(buttonPrompt.params)} />
            ))} */}
        </div>
    );
};

export default ButtonOptions;

const styles = {
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '0 18vw',
    },
    button: {
        backgroundColor: 'white',
        padding: '30px 20px',
        width: "30vw",
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '30px',
        transition: 'all 0.3s ease',
        fontFamily: "Irish Grover",

    },
};
