
import React from 'react';
import { Trophy, Flame, Clock } from 'lucide-react';
import { LeaderboardEntry } from './Leaderboard';

interface HallOfFameProps {
  leaderboard: LeaderboardEntry[];
}

const HallOfFame: React.FC<HallOfFameProps> = ({ leaderboard }) => {
  if (leaderboard.length === 0) {
    return null;
  }

  const getDifficultyColor = (difficulty: string | undefined) => {
    if (!difficulty) return 'text-gray-600';
    return difficulty === 'easy' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="p-4 md:p-6 border-b-2 border-black">
        <h3 className="text-lg md:text-2xl font-black uppercase tracking-wider flex items-center gap-2">
          <Trophy className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          YOUR HIGHSCORES
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground font-bold uppercase mt-1">
          Your personal best scores
        </p>
      </div>
      <div className="p-4 md:p-6 max-h-80 md:max-h-96 overflow-y-auto">
        <div className="space-y-3">
          {leaderboard.slice(0, 8).map((entry, index) => (
            <div
              key={`${entry.name}-${index}`}
              className={`flex items-center justify-between p-3 md:p-4 border-2 border-black text-sm md:text-base ${
                index < 3 ? 'bg-secondary/20' : 'bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                <div className={`w-8 h-8 md:w-10 md:h-10 border-2 border-black flex items-center justify-center font-black text-sm md:text-base ${
                  index === 0 ? 'bg-yellow-400' : 
                  index === 1 ? 'bg-gray-300' : 
                  index === 2 ? 'bg-amber-600' : 'bg-white'
                }`}>
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold uppercase truncate max-w-[120px] md:max-w-none">
                    {entry.name}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground uppercase">
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      <span className={getDifficultyColor(entry.difficulty)}>
                        {entry.difficulty?.toUpperCase() || 'UNKNOWN'}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="whitespace-nowrap">{entry.gamesPlayed}G</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="whitespace-nowrap">{entry.streak || 0}S</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="whitespace-nowrap">{entry.accuracy}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right ml-2">
                <div className="font-black text-lg md:text-xl">{entry.score}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HallOfFame;
