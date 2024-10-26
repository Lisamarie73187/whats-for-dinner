import React from 'react';


const ErrorModal = ({ show, onClose, text}) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <div>{text}</div>
            </div>
        </div>
    );
};

export default ErrorModal;
