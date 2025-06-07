
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

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
      <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-white/20 p-4 min-w-[400px]">
        {gameState === 'guessing' ? (
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              type="text"
              placeholder="Enter city name..."
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={disabled}
              className="flex-1 bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              autoFocus
            />
            <Button 
              type="submit" 
              disabled={disabled || !guess.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-3">
            <div className={`text-lg font-semibold ${
              gameState === 'correct' ? 'text-green-600' : 'text-red-600'
            }`}>
              {gameState === 'correct' ? '🎉 Correct!' : '❌ Incorrect!'}
            </div>
            <Button 
              onClick={onNextRound} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next City →
            </Button>
            <p className="text-xs text-gray-500">Press Enter for next city</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingGuessInput;
