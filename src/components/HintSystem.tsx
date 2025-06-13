
import { useState } from 'react';
import { City } from '../data/cities';

export interface HintState {
  continent: boolean;
  firstLetter: boolean;
  country: boolean;
  randomLetters: Set<number>;
}

export const useHintSystem = () => {
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState<Set<number>>(new Set());
  const [hintState, setHintState] = useState<HintState>({
    continent: false,
    firstLetter: false,
    country: false,
    randomLetters: new Set()
  });

  const getNextHint = (city: City): string => {
    if (hintsUsed >= 4) return '';

    const nextHintCount = hintsUsed + 1;
    
    switch (nextHintCount) {
      case 1:
        setHintState(prev => ({ ...prev, continent: true }));
        return `Hint: This city is in ${city.continent}`;
      
      case 2:
        setHintState(prev => ({ ...prev, firstLetter: true }));
        setRevealedLetters(prev => new Set(prev).add(0));
        return `Hint: City starts with "${city.name[0].toUpperCase()}"`;
      
      case 3:
        setHintState(prev => ({ ...prev, country: true }));
        return `Hint: This city is in ${city.country}`;
      
      case 4:
        // Reveal 2 random letters (excluding first letter and spaces)
        const availableIndices = city.name
          .split('')
          .map((char, index) => ({ char, index }))
          .filter(({ char, index }) => char !== ' ' && index !== 0 && !revealedLetters.has(index))
          .map(({ index }) => index);
        
        const randomIndices = availableIndices
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);
        
        const newRevealedLetters = new Set(revealedLetters);
        randomIndices.forEach(index => newRevealedLetters.add(index));
        
        setRevealedLetters(newRevealedLetters);
        setHintState(prev => ({ 
          ...prev, 
          randomLetters: new Set([...prev.randomLetters, ...randomIndices])
        }));
        
        return `Hint: Revealed 2 more letters in the city name`;
      
      default:
        return '';
    }
  };

  const useHint = (city: City): string => {
    if (hintsUsed >= 4) return '';
    
    const hintMessage = getNextHint(city);
    setHintsUsed(prev => prev + 1);
    return hintMessage;
  };

  const resetHints = () => {
    setHintsUsed(0);
    setRevealedLetters(new Set());
    setHintState({
      continent: false,
      firstLetter: false,
      country: false,
      randomLetters: new Set()
    });
  };

  return {
    hintsUsed,
    revealedLetters,
    hintState,
    useHint,
    resetHints,
    canUseHint: hintsUsed < 4
  };
};
