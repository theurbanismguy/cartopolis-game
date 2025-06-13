
import React, { useState } from 'react';
import DifficultySelector from './DifficultySelector';
import { Difficulty } from '../data/cities';

interface GameSetupFormProps {
  onStartGame: (playerName: string, difficulty: Difficulty) => void;
}

const GameSetupForm: React.FC<GameSetupFormProps> = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onStartGame(playerName.trim(), difficulty);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="p-4 border-b-2 border-black">
        <h2 className="text-lg md:text-2xl font-black uppercase tracking-wider text-center">
          URBAN EXPLORER NAME
        </h2>
      </div>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="ENTER YOUR NAME..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full border-2 border-black bg-white px-3 py-2 md:py-3 font-bold text-base md:text-lg"
              required
            />
          </div>

          <DifficultySelector 
            difficulty={difficulty} 
            onDifficultyChange={setDifficulty} 
          />

          <button
            type="submit"
            disabled={!playerName.trim()}
            className="w-full bg-primary text-primary-foreground border-2 border-black font-bold uppercase tracking-wider py-4 md:py-6 text-base md:text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            LET'S GO
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameSetupForm;
