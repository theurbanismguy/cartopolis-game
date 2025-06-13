
import React from 'react';
import Leaderboard, { LeaderboardEntry } from './Leaderboard';

interface LeaderboardScreenProps {
  leaderboard: LeaderboardEntry[];
  onBackToGame: () => void;
  onNewGame: () => void;
  onBackToMenu: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  leaderboard,
  onBackToGame,
  onNewGame,
  onBackToMenu
}) => {
  return (
    <div className="min-h-screen neo-gradient-bg p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black neo-text-shadow text-white uppercase tracking-wider">
            YOUR HIGHSCORES
          </h1>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <button 
              onClick={onBackToGame}
              className="neo-button-secondary px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
            >
              BACK TO GAME
            </button>
            <button 
              onClick={onNewGame}
              className="neo-button-accent px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
            >
              NEW GAME
            </button>
            <button 
              onClick={onBackToMenu}
              className="neo-button px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
            >
              MAIN MENU
            </button>
          </div>
        </div>
        <div className="neo-card bg-white/95">
          <Leaderboard entries={leaderboard} />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
