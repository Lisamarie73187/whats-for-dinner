const randomPrompts = [
    'What ridiculous thing am I supposed to whip up now?',
    'What the hell am I making for dinner?',
    'Surprise me with something delicious',
    'And I’m making… what?'
]


const useRandomGetRecipeButtonPrompts = () => {
    const randomIndex = Math.floor(Math.random() * randomPrompts.length);
    return randomPrompts[randomIndex];
  };

export default useRandomGetRecipeButtonPrompts;