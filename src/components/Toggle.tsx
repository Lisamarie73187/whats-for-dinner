import React, { useState } from 'react';

interface ToggleProps {
    initialState?: boolean;
    onLabel?: string;
    offLabel?: string;
    onToggle?: (state: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ 
    initialState = false, 
    onLabel = "On", 
    offLabel = "Off", 
    onToggle 
}) => {
    const [isOn, setIsOn] = useState(initialState);

    const handleToggle = () => {
        setIsOn((prevState) => {
            const newState = !prevState;
            if (onToggle) onToggle(newState);
            return newState;
        });
    };

    return (
        <button onClick={handleToggle} style={styles.button(isOn)}>
            {isOn ? onLabel : offLabel}
        </button>
    );
};

const styles = {
    button: (isOn: boolean) => ({
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '20px',
        backgroundColor: isOn ? '#34c1bf' : '#ccc',
        color: '#fff',
        border: 'none',
        transition: 'background-color 0.3s ease',
    }),
};

export default Toggle;
