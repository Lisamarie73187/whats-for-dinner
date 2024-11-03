import React, { useCallback, useState } from 'react';
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

    const handleToggle = useCallback(() => {
        setIsOn((prevState) => {
            const newState = !prevState;
            if (onToggle) onToggle(newState);
            return newState;
        });
    }, [onToggle]);

    return (
        <div className="toggle-wrapper">
            {label && <div className="toggle-label">{label}</div>}
            <motion.button
                onClick={handleToggle}
                initial={false}
                animate={{
                    backgroundColor: isOn ? '#34c1bf' : '#d0d0d0',
                    scale: isOn ? 1.05 : 1,
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="toggle-button"
            >
                <span className="toggle-button-text">{isOn ? onLabel : offLabel}</span>
            </motion.button>
        </div>
    );
};

export default Toggle;
