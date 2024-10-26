import React from 'react';
import { Button } from './Button';

const ErrorModal = ({ show, onClose, text}) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h3>{text}</h3>
                <Button text={"Start Over, Please"} onClick={() => window.location.reload()} color={'#fdac1f'}/>
            </div>
        </div>
    );
};

export default ErrorModal;