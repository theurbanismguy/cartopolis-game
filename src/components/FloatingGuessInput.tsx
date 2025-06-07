
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
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="neo-card bg-white/95 backdrop-blur-sm min-w-[400px]">
        <div className="p-4">
          {gameState === 'guessing' ? (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                type="text"
                placeholder="ENTER CITY NAME..."
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                disabled={disabled}
                className="neo-input flex-1"
                autoFocus
              />
              <button 
                type="submit" 
                disabled={disabled || !guess.trim()}
                className="neo-button px-4 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                GUESS
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className={`text-2xl font-black uppercase tracking-wider ${
                gameState === 'correct' ? 'text-green-600' : 'text-red-600'
              }`}>
                {gameState === 'correct' ? '🎉 CORRECT!' : '❌ WRONG!'}
              </div>
              <button 
                onClick={onNextRound} 
                className="w-full neo-button-accent text-lg py-4 flex items-center justify-center gap-2"
              >
                NEXT CITY
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-sm font-bold uppercase text-muted-foreground">
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
