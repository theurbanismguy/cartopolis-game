
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Zap, Clock, Flame } from 'lucide-react';
import { Difficulty } from '../data/cities';

interface GameEnhancedStatsProps {
  score: number;
  totalGuesses: number;
  currentRound: number;
  playerName: string;
  difficulty: Difficulty;
  currentStreak: number;
  bestStreak: number;
  timeBonus: number;
}

const GameEnhancedStats: React.FC<GameEnhancedStatsProps> = ({
  score,
  totalGuesses,
  currentRound,
  playerName,
  difficulty,
  currentStreak,
  bestStreak,
  timeBonus
}) => {
  const accuracy = totalGuesses > 0 ? Math.round((score / Math.max(totalGuesses, 1)) * 10) : 0;
  
  const getStreakColor = (streak: number) => {
    if (streak >= 10) return 'text-red-500';
    if (streak >= 5) return 'text-orange-500';
    if (streak >= 3) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-72 md:w-80">
      <div className="neo-card bg-white/95 backdrop-blur-sm">
        <CardContent className="p-3 md:p-4">
          <div className="space-y-3">
            {/* Player info */}
            <div className="text-center border-b-2 border-black pb-2">
              <h3 className="font-black uppercase text-lg md:text-xl tracking-wider truncate">
                {playerName}
              </h3>
              <div className={`text-sm font-bold uppercase ${getDifficultyColor(difficulty)}`}>
                {difficulty} MODE • ROUND {currentRound}
              </div>
            </div>

            {/* Score and streaks */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold uppercase">Score</span>
                </div>
                <div className="text-xl md:text-2xl font-black">{score}</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-bold uppercase">Accuracy</span>
                </div>
                <div className="text-xl md:text-2xl font-black">{accuracy}%</div>
              </div>
            </div>

            {/* Streaks */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Flame className={`w-4 h-4 ${getStreakColor(currentStreak)}`} />
                  <span className="text-xs font-bold uppercase">Streak</span>
                </div>
                <div className={`text-lg md:text-xl font-black ${getStreakColor(currentStreak)}`}>
                  {currentStreak}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase">Best</span>
                </div>
                <div className="text-lg md:text-xl font-black">{bestStreak}</div>
              </div>
            </div>

            {/* Time bonus */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold uppercase">Speed Bonus</span>
              </div>
              <div className="text-lg font-black text-blue-500">+{timeBonus}</div>
            </div>

            {/* Streak multiplier indicator */}
            {currentStreak >= 3 && (
              <div className="text-center p-2 bg-accent/20 border-2 border-accent">
                <div className="text-sm font-black uppercase text-accent">
                  {currentStreak >= 10 ? '5X MULTIPLIER!' : 
                   currentStreak >= 5 ? '3X MULTIPLIER!' : '2X MULTIPLIER!'}
                </div>
                <div className="text-xs font-bold uppercase">
                  ON FIRE! 🔥
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default GameEnhancedStats;
