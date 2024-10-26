import React from 'react';
import useRandomPrompt from '../hooks/useRandomPrompt';
import { loadingPromptsArray } from '../prompts';


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
        fontSize: '30px',
        marginTop: '200px',
        color: '#fffbf6',
    }
}