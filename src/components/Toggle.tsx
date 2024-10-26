import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
    initialState?: boolean;
    onLabel?: string;
    offLabel?: string;
    label?: string;
    onToggle?: (state: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ 
    initialState = false, 
    onLabel = "On", 
    offLabel = "Off", 
    label,
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
        <div style={styles.wrapper}>
            <div style={styles.label}>{label}</div>
            <motion.button
                onClick={handleToggle}
                initial={false}
                animate={{
                    backgroundColor: isOn ? '#34c1bf' : '#999',
                    scale: isOn ? 1.05 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={styles.button}
            >
                <span style={styles.buttonText}>{isOn ? onLabel : offLabel}</span>
            </motion.button>
        </div>
    );
};

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '8px',
        paddingBottom: '20px',
    },
    button: {
        width: '100px',
        height: '40px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        color: '#fff',
        fontFamily: 'Open Sans, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    },
    buttonText: {
        padding: '0 10px',
    },
    label: {
        fontSize: '18px',
        color: '#fff',
        fontFamily: 'Open Sans, sans-serif',
        fontWeight: 'bold',
    },
};

export default Toggle;
