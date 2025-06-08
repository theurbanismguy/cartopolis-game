
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trophy, Target, Flame } from 'lucide-react';
import { Difficulty } from '../data/cities';

interface MobileGameStatsProps {
  score: number;
  totalGuesses: number;
  currentRound: number;
  playerName: string;
  difficulty: Difficulty;
  currentStreak: number;
  bestStreak: number;
  timeBonus: number;
}

const MobileGameStats: React.FC<MobileGameStatsProps> = ({
  score,
  totalGuesses,
  currentRound,
  playerName,
  difficulty,
  currentStreak,
  bestStreak,
  timeBonus
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const accuracy = totalGuesses > 0 ? Math.round((score / Math.max(totalGuesses, 1)) * 10) : 0;

  const getStreakColor = (streak: number) => {
    if (streak >= 10) return 'text-red-500';
    if (streak >= 5) return 'text-orange-500';
    if (streak >= 3) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  return (
    <div className="fixed top-2 left-2 right-2 z-40 md:hidden">
      <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {/* Collapsed View */}
        <div 
          className="flex items-center justify-between p-2 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="text-sm font-black uppercase truncate max-w-[120px]">
              {playerName}
            </div>
            <div className="text-xs font-bold text-muted-foreground">
              R{currentRound}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Trophy className="w-3 h-3 text-accent" />
              <span className="text-sm font-black">{score}</span>
            </div>
            
            {currentStreak > 0 && (
              <div className="flex items-center gap-1">
                <Flame className={`w-3 h-3 ${getStreakColor(currentStreak)}`} />
                <span className={`text-sm font-black ${getStreakColor(currentStreak)}`}>
                  {currentStreak}
                </span>
              </div>
            )}
            
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <div className="border-t-2 border-black p-3 space-y-2">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xs font-bold uppercase text-muted-foreground">Score</div>
                <div className="text-lg font-black">{score}</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-muted-foreground">Accuracy</div>
                <div className="text-lg font-black">{accuracy}%</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-muted-foreground">Streak</div>
                <div className={`text-lg font-black ${getStreakColor(currentStreak)}`}>
                  {currentStreak}
                </div>
              </div>
            </div>
            
            {currentStreak >= 3 && (
              <div className="text-center p-2 bg-accent/20 border border-accent">
                <div className="text-xs font-black uppercase text-accent">
                  {currentStreak >= 10 ? '5X MULTIPLIER!' : 
                   currentStreak >= 5 ? '3X MULTIPLIER!' : '2X MULTIPLIER!'}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileGameStats;
