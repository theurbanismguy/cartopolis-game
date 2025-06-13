
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
    <div className="relative w-full min-h-screen overflow-auto">
      <BackgroundMap />
      
      {/* Content overlay - single column layout with smooth scrolling */}
      <div 
        className="relative min-h-screen flex flex-col"
        style={{ zIndex: 10 }}
      >
        <div className="flex-1 p-4 pb-8">
          <div className="max-w-2xl mx-auto space-y-8">
            
            {/* Title - removed subtitle */}
            <div className="text-center pt-8 md:pt-16">
              <h1 className="text-5xl md:text-8xl font-black neo-text-shadow text-white tracking-wider">
                CARTOPOLIS
              </h1>
            </div>

            {/* Game Setup Form */}
            <div className="px-2">
              <GameSetupForm onStartGame={onStartGame} />
            </div>

            {/* Hall of Fame - Better mobile spacing */}
            <div className="px-2 pb-8">
              <HallOfFame leaderboard={leaderboard} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
