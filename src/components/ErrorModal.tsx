import React from 'react';
import AnimatedButton from './AnimatedButton';

const ErrorModal = ({ show, onClose, text}) => {
    if (!show) return null;

    const handleReset = async () => {
        window.location.reload();
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h3>{text}</h3>
                <AnimatedButton text={"Start Over, Please"} onClick={handleReset} color={'#fdac1f'}/>
            </div>
        </div>
    );
};

export default ErrorModal;
