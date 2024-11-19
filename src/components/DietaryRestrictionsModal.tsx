import React, { useState, useEffect, useCallback } from 'react';
import Toggle from './Toggle';
import AnimatedButton from './AnimatedButton';

interface DietaryRestrictionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const DIETARY_PREFERENCES_KEY = "dietaryPreferences";

const DietaryRestrictionsModal: React.FC<DietaryRestrictionsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [dietaryPreferences, setDietaryPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem(DIETARY_PREFERENCES_KEY);
    return savedPreferences
      ? JSON.parse(savedPreferences)
      : { isVegetarian: false, isGlutenFree: false, isDairyFree: false };
  });

  const togglePreference = (key: keyof typeof dietaryPreferences) => {
    setDietaryPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  console.log(dietaryPreferences);

  const saveRestrictions = useCallback(() => {
    localStorage.setItem(DIETARY_PREFERENCES_KEY, JSON.stringify(dietaryPreferences));
    onSave();
  }, [onSave, dietaryPreferences]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dietary-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="toggleContainer">
          <Toggle
            initialState={dietaryPreferences.isVegetarian}
            onToggle={() => togglePreference("isVegetarian")}
            label="Vegetarian"
          />
          <Toggle
            initialState={dietaryPreferences.isGlutenFree}
            onToggle={() => togglePreference("isGlutenFree")}
            label="Gluten-Free"
          />
          <Toggle
            initialState={dietaryPreferences.isDairyFree}
            onToggle={() => togglePreference("isDairyFree")}
            label="Dairy-Free"
          />
        </div>
        <AnimatedButton text="Save" onClick={saveRestrictions} color="#FFA500" width={'100%'} />
      </div>
    </div>
  );
};

export default DietaryRestrictionsModal;
