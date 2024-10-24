import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} style={styles.button}>
      {text}
    </button>
  );
}


const ButtonOptions = () => {
    return (
    <div>
        <Button text="Generate Random Recipe" onClick={() => console.log('Generate random recipe')} />
    </div>
    );
  }

export default ButtonOptions;


const styles = {
    button: {
        backgroundColor: '#22babf',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'all 0.3s ease'
    }
}