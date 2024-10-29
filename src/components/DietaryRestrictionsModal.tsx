import React, { useState, useEffect } from 'react';
import Toggle from './Toggle';

interface DietaryRestrictionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const VEGETARIAN_KEY = "isVegetarian";
const GLUTEN_FREE_KEY = "isGlutenFree";
const DAIRY_FREE_KEY = "isDairyFree";

const DietaryRestrictionsModal: React.FC<DietaryRestrictionsModalProps> = ({ isOpen, onClose }) => {
    const [isVegetarian, setIsVegetarian] = useState(() => localStorage.getItem(VEGETARIAN_KEY) === "true");
    const [isGlutenFree, setIsGlutenFree] = useState(() => localStorage.getItem(GLUTEN_FREE_KEY) === "true");
    const [isDairyFree, setIsDairyFree] = useState(() => localStorage.getItem(DAIRY_FREE_KEY) === "true");

    useEffect(() => {
        localStorage.setItem(VEGETARIAN_KEY, JSON.stringify(isVegetarian));
      }, [isVegetarian]);
    
      useEffect(() => {
        localStorage.setItem(GLUTEN_FREE_KEY, JSON.stringify(isGlutenFree));
      }, [isGlutenFree]);
    
      useEffect(() => {
        localStorage.setItem(DAIRY_FREE_KEY, JSON.stringify(isDairyFree));
      }, [isDairyFree]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dietary-content">
      <button className="modal-close" onClick={onClose}>×</button>
      <div className="toggleContainer">
            <Toggle initialState={isVegetarian} onToggle={() => setIsVegetarian(!isVegetarian)} label="Vegetarian" />
            <Toggle initialState={isGlutenFree} onToggle={() => setIsGlutenFree(!isGlutenFree)} label="Gluten-Free" />
            <Toggle initialState={isDairyFree} onToggle={() => setIsDairyFree(!isDairyFree)} label="Dairy-Free" />
          </div>
      </div>
    </div>
  );
};

export default DietaryRestrictionsModal;