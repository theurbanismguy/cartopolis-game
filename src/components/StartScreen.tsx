
import React from 'react';
import BackgroundMap from './BackgroundMap';
import GameSetupForm from './GameSetupForm';
import HallOfFame from './HallOfFame';
import { LeaderboardEntry } from './Leaderboard';
import { Difficulty } from '../data/cities';

interface StartScreenProps {
  onStartGame: (playerName: string, difficulty: Difficulty) => void;
  leaderboard: LeaderboardEntry[];
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, leaderboard }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <BackgroundMap />
      
      {/* Content overlay - single column layout */}
      <div 
        className="relative h-full flex flex-col"
        style={{ zIndex: 10 }}
      >
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="max-w-2xl w-full space-y-8">
            
            {/* Title - removed subtitle */}
            <div className="text-center">
              <h1 className="text-5xl md:text-8xl font-black neo-text-shadow text-white tracking-wider">
                CARTOPOLIS
              </h1>
            </div>

            {/* Game Setup Form */}
            <GameSetupForm onStartGame={onStartGame} />

            {/* Hall of Fame - Below the fold */}
            <HallOfFame leaderboard={leaderboard} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
