
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowRight } from 'lucide-react';

interface FloatingGuessInputProps {
  onGuess: (guess: string) => void;
  disabled: boolean;
  gameState: 'guessing' | 'correct' | 'incorrect';
  onNextRound: () => void;
}

const FloatingGuessInput: React.FC<FloatingGuessInputProps> = ({ 
  onGuess, 
  disabled, 
  gameState, 
  onNextRound 
}) => {
  const [guess, setGuess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim() && !disabled) {
      onGuess(guess.trim());
      setGuess('');
    }
  };

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

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 z-50">
      <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:min-w-[400px]">
        <div className="p-3 md:p-4">
          {gameState === 'guessing' ? (
            <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3">
              <input
                type="text"
                placeholder="ENTER CITY NAME..."
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                disabled={disabled}
                className="flex-1 border-2 border-black bg-white px-3 py-2 md:py-3 font-bold text-sm md:text-base focus:outline-none focus:ring-0 focus:border-accent"
                autoFocus
              />
              <button 
                type="submit" 
                disabled={disabled || !guess.trim()}
                className="bg-primary text-primary-foreground border-2 border-black px-3 md:px-4 flex items-center gap-2 font-bold uppercase text-sm md:text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">GUESS</span>
              </button>
            </form>
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

export default FloatingGuessInput;
