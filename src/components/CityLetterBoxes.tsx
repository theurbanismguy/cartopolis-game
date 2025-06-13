
import React from 'react';

interface CityLetterBoxesProps {
  cityName: string;
  revealedLetters: Set<number>;
  showAnswer: boolean;
}

const CityLetterBoxes: React.FC<CityLetterBoxesProps> = ({ 
  cityName, 
  revealedLetters, 
  showAnswer 
}) => {
  const letters = cityName.toUpperCase().split('');

  return (
    <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-4">
      {letters.map((letter, index) => {
        const isSpace = letter === ' ';
        const isRevealed = showAnswer || revealedLetters.has(index);
        
        if (isSpace) {
          return (
            <div key={index} className="w-2 md:w-4" />
          );
        }

        return (
          <div
            key={index}
            className={`w-8 h-8 md:w-12 md:h-12 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-lg md:text-xl ${
              isRevealed ? 'text-black' : 'text-transparent'
            }`}
          >
            {isRevealed ? letter : '_'}
          </div>
        );
      })}
    </div>
  );
};

export default CityLetterBoxes;
