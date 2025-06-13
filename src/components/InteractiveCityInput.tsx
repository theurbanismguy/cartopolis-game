
import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowRight } from 'lucide-react';

interface InteractiveCityInputProps {
  cityName: string;
  revealedLetters: Set<number>;
  onGuess: (guess: string) => void;
  disabled: boolean;
  gameState: 'guessing' | 'correct' | 'incorrect';
  onNextRound: () => void;
  showAnswer: boolean;
}

const InteractiveCityInput: React.FC<InteractiveCityInputProps> = ({
  cityName,
  revealedLetters,
  onGuess,
  disabled,
  gameState,
  onNextRound,
  showAnswer
}) => {
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const letters = cityName.toUpperCase().split('');

  // Initialize input values when city changes
  useEffect(() => {
    const newInputValues = letters.map((letter, index) => {
      if (letter === ' ') return ' ';
      if (showAnswer || revealedLetters.has(index)) return letter;
      return '';
    });
    setInputValues(newInputValues);
    setFocusedIndex(0);
  }, [cityName, revealedLetters, showAnswer]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && gameState !== 'guessing') {
        onNextRound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, onNextRound]);

  const handleInputChange = (index: number, value: string) => {
    if (disabled || letters[index] === ' ') return;

    const newInputValues = [...inputValues];
    newInputValues[index] = value.toUpperCase();
    setInputValues(newInputValues);

    // Move to next empty input
    if (value && index < letters.length - 1) {
      const nextIndex = letters.findIndex((letter, i) => i > index && letter !== ' ' && !newInputValues[i]);
      if (nextIndex !== -1) {
        setFocusedIndex(nextIndex);
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !inputValues[index] && index > 0) {
      // Find previous non-space index using a loop instead of findLastIndex
      let prevIndex = -1;
      for (let i = index - 1; i >= 0; i--) {
        if (letters[i] !== ' ') {
          prevIndex = i;
          break;
        }
      }
      
      if (prevIndex !== -1) {
        setFocusedIndex(prevIndex);
        inputRefs.current[prevIndex]?.focus();
      }
    } else if (e.key === 'Enter') {
      handleGuess();
    }
  };

  const handleGuess = () => {
    const guess = inputValues.join('').trim();
    if (guess && !disabled) {
      onGuess(guess);
    }
  };

  const isComplete = inputValues.every((val, index) => 
    letters[index] === ' ' || val !== ''
  );

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 z-40">
      <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:min-w-[500px]">
        <div className="p-4">
          {gameState === 'guessing' ? (
            <div className="space-y-4">
              {/* Interactive Letter Boxes */}
              <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                {letters.map((letter, index) => {
                  const isSpace = letter === ' ';
                  const isRevealed = showAnswer || revealedLetters.has(index);
                  
                  if (isSpace) {
                    return <div key={index} className="w-2 md:w-4" />;
                  }

                  return (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      maxLength={1}
                      value={inputValues[index] || ''}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onFocus={() => setFocusedIndex(index)}
                      disabled={disabled || isRevealed}
                      className={`w-8 h-8 md:w-12 md:h-12 border-2 border-black bg-white text-center font-black text-lg md:text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0 focus:border-accent uppercase ${
                        isRevealed ? 'bg-accent/20 text-accent' : 'focus:bg-blue-50'
                      } ${focusedIndex === index ? 'ring-2 ring-accent' : ''}`}
                    />
                  );
                })}
              </div>

              {/* Guess Button */}
              <div className="flex justify-center">
                <button 
                  onClick={handleGuess}
                  disabled={disabled || !isComplete}
                  className="bg-primary text-primary-foreground border-2 border-black px-6 py-3 flex items-center gap-2 font-bold uppercase text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  GUESS CITY
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-3 md:space-y-4">
              <div className={`text-xl md:text-2xl font-black uppercase tracking-wider ${
                gameState === 'correct' ? 'text-green-600' : 'text-red-600'
              }`}>
                {gameState === 'correct' ? '🎉 CORRECT!' : '❌ WRONG!'}
              </div>
              <button 
                onClick={onNextRound} 
                className="w-full bg-accent text-accent-foreground border-2 border-black text-base md:text-lg py-3 md:py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100 active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                NEXT CITY
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs md:text-sm font-bold uppercase text-muted-foreground">
                Press Enter for next city
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveCityInput;
