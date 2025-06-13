
import React from 'react';
import { Star, Flame, Target } from 'lucide-react';

interface TopBarProps {
  playerName: string;
  score: number;
  currentRound: number;
  currentStreak: number;
  onShowLeaderboard: () => void;
  onEndGame: () => void;
  onBackToMenu: () => void;
  accuracy: number;
}

const TopBar: React.FC<TopBarProps> = ({
  playerName,
  score,
  currentRound,
  currentStreak,
  accuracy
}) => {
  const getStreakColor = (streak: number) => {
    if (streak >= 10) return 'text-red-500';
    if (streak >= 5) return 'text-orange-500';
    if (streak >= 3) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-white/95 backdrop-blur-sm border-b-2 border-black">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side - Player info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="text-sm font-black uppercase truncate max-w-[100px]">
              {playerName}
            </div>
            <div className="text-xs font-bold text-muted-foreground">
              R{currentRound}
            </div>
          </div>
          
          {/* Right side - Score, streak, and accuracy */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black">{score}</span>
            </div>
            
            {currentStreak > 0 && (
              <div className="flex items-center gap-1">
                <Flame className={`w-4 h-4 ${getStreakColor(currentStreak)}`} />
                <span className={`text-sm font-black ${getStreakColor(currentStreak)}`}>
                  {currentStreak}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Target className="w-3 h-3 text-blue-500" />
              <span className="text-xs font-bold text-blue-500">{accuracy}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
