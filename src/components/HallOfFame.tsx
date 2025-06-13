
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

  return (
    <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="p-3 md:p-4 border-b-2 border-black">
        <h3 className="text-base md:text-2xl font-black uppercase tracking-wider flex items-center gap-2">
          <Trophy className="w-4 h-4 md:w-6 md:h-6 text-accent" />
          HALL OF FAME
        </h3>
      </div>
      <div className="p-3 md:p-4 max-h-60 md:max-h-96 overflow-y-auto">
        <div className="space-y-2">
          {leaderboard.slice(0, 8).map((entry, index) => (
            <div
              key={`${entry.name}-${index}`}
              className={`flex items-center justify-between p-2 md:p-3 border-2 border-black text-sm md:text-base ${
                index < 3 ? 'bg-secondary/20' : 'bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className={`w-6 h-6 md:w-8 md:h-8 border border-black md:border-2 flex items-center justify-center font-black text-xs md:text-sm ${
                  index === 0 ? 'bg-yellow-400' : 
                  index === 1 ? 'bg-gray-300' : 
                  index === 2 ? 'bg-amber-600' : 'bg-white'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <div className="font-bold uppercase truncate max-w-[120px] md:max-w-none">
                    {entry.name}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground uppercase">
                    {entry.gamesPlayed} Games • {entry.streak || 0} Streak
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-black text-base md:text-lg">{entry.score}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{entry.accuracy}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HallOfFame;
