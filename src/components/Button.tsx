import React from 'react';


interface ButtonProps {
    text: string;
    onClick: () => void;
    width?: string;
    color?: string;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, width, color }) => {
    
    return (
        <button onClick={onClick} style={{ ...styles.button, width, backgroundColor: color }}>
            {text}
        </button>
    );
};

const styles = {
    button: {
        backgroundColor: '#fffbf6',
        color: '#333',
        border: 'none',
        padding: '10px 20px',
        fontSize: '20px',
        cursor: 'pointer',
        borderRadius: '25px',
        transition: 'background-color 0.3s ease',
        fontFamily: "open sans",
        marginTop: '20px',
        boxShadow: '10px -6px 15px -11px rgba(0, 0, 0, 0.75)',
    },
};
