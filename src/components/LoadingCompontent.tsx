import React from 'react';
import useRandomPrompt from '../hooks/useRandomPrompt';

const loadingPromptsArray = [
    'Go grab a coffee, this might take a while.',
    'Loading... because we love wasting your time.',
    'Maybe it’s broken. Maybe not. Who knows?',
    'Patience, young grasshopper.',
    'Still loading... blame the internet.',
    'Slow internet, huh?'
]
const LoadingComponent: React.FC = () => {
    const randomLoadingPrompt = useRandomPrompt(loadingPromptsArray);

    return (
        <div style={styles.container}>
            <p>{randomLoadingPrompt}</p>
        </div>
    );
};

export default LoadingComponent;

const styles = {
    container: {
        fontFamily: "Irish Grover",
        fontSize: '24px',
        marginTop: '200px',
        color: '#fffbf6',
    }
}