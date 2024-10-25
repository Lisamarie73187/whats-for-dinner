import React from 'react';
import useRandomPrompt from '../hooks/useRandomPrompt';

const promptsArray = [
    'Oh, you again. How about this...',
    'You’ll eat this and like it...',
    'Fine, here’s a recipe. Happy now?',
    'I guess this will do...',
    'Stop complaining and try this...',
    'Don’t act like you have better ideas. Here...',
    'Whatever, just cook this...',
    'Oh look, food. Surprise!',
    'I know, I know... You’re welcome.',
    'Let’s not make this harder. Here...'
];

const HowAboutPrompt = () => {
    const randomPrompt = useRandomPrompt(promptsArray);

    return (
    <div style={styles.container}>
        <div style={styles.subHeading}>{randomPrompt}</div>
    </div>
    );
  }

export default HowAboutPrompt;

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    subHeading: {
        fontSize: '5rem',
        color: '#fffbf6',
        fontFamily: "Irish Grover",
        fontWeight: "Regular",
        fontStyle: "normal",
        width: '50vw',
      },
}