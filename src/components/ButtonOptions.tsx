import React from 'react';
import useRandomPrompt from '../hooks/useRandomPrompt';
import useRandomButtonPrompts from '../hooks/useRandomButtonPrompts';

interface ButtonOptionsProps {
    getRecipe: (queries?: any) => void;
    recipe: any;
    queries: any;
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

const ButtonOptions: React.FC<ButtonOptionsProps> = ({  getRecipe, queries }) => {
    const randomLoadingPrompt = useRandomPrompt(hateItButtonPrompts);
    const randomButtonPrompt = useRandomButtonPrompts(queries)


    return (
        <div style={styles.buttonContainer}>
            <Button text={randomLoadingPrompt} onClick={() => getRecipe()} />
            {randomButtonPrompt.map((buttonPrompt, index) => (
                <Button key={index} text={buttonPrompt.prompt} onClick={() => getRecipe(buttonPrompt.params)} />
            ))}
        </div>
    );
};

export default ButtonOptions;

const styles = {
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '60px',
        margin: '0 10vw',
    },
    button: {
        backgroundColor: '#fffbf6',
        color: '#333',
        border: 'none',
        padding: '10px 10px',
        fontSize: '20px',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
        fontFamily: "open sans",
        marginTop: '20px',
        width: '20vw'
    },
};
