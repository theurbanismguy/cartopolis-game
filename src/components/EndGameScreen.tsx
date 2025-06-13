
import React from 'react';
import { Star, Flame, Target, Home, Play } from 'lucide-react';
import Leaderboard, { LeaderboardEntry } from './Leaderboard';

interface EndGameScreenProps {
  playerName: string;
  finalScore: number;
  accuracy: number;
  bestStreak: number;
  gamesPlayed: number;
  leaderboard: LeaderboardEntry[];
  onNewGame: () => void;
  onBackToMenu: () => void;
}

const EndGameScreen: React.FC<EndGameScreenProps> = ({
  playerName,
  finalScore,
  accuracy,
  bestStreak,
  gamesPlayed,
  leaderboard,
  onNewGame,
  onBackToMenu
}) => {
  return (
    <div className="min-h-screen neo-gradient-bg p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Game Over Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black neo-text-shadow text-white uppercase tracking-wider">
            GAME OVER
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-bold">
            Well played, {playerName}!
          </p>
        </div>

        {/* Final Score Summary */}
        <div className="neo-card bg-white/95 mx-auto max-w-2xl">
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-black text-center uppercase tracking-wider border-b-2 border-black pb-2">
              YOUR FINAL STATS
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-yellow-50 border-2 border-black">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-black">{finalScore}</div>
                <div className="text-sm font-bold uppercase">Final Score</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 border-2 border-black">
                <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-black">{accuracy}%</div>
                <div className="text-sm font-bold uppercase">Accuracy</div>
              </div>
              
              <div className="text-center p-4 bg-red-50 border-2 border-black">
                <Flame className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-black">{bestStreak}</div>
                <div className="text-sm font-bold uppercase">Best Streak</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 border-2 border-black">
                <Play className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-black">{gamesPlayed}</div>
                <div className="text-sm font-bold uppercase">Cities Played</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={onNewGame}
            className="neo-button-accent px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-black uppercase tracking-wider"
          >
            <Play className="w-5 h-5 inline mr-2" />
            NEW GAME
          </button>
          <button 
            onClick={onBackToMenu}
            className="neo-button px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-black uppercase tracking-wider"
          >
            <Home className="w-5 h-5 inline mr-2" />
            MAIN MENU
          </button>
        </div>

        {/* Leaderboard */}
        <div className="neo-card bg-white/95">
          <div className="p-4">
            <h2 className="text-2xl md:text-3xl font-black text-center uppercase tracking-wider mb-4 border-b-2 border-black pb-2">
              HALL OF FAME
            </h2>
            <Leaderboard entries={leaderboard} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndGameScreen;
