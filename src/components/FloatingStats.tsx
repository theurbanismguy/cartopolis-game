
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Zap, Globe } from 'lucide-react';
import { Difficulty } from '../data/cities';

interface FloatingStatsProps {
  score: number;
  totalGuesses: number;
  currentRound: number;
  playerName: string;
  difficulty: Difficulty;
}

const FloatingStats: React.FC<FloatingStatsProps> = ({ 
  score, 
  totalGuesses, 
  currentRound, 
  playerName,
  difficulty 
}) => {
  const accuracy = totalGuesses > 0 ? Math.round((score / totalGuesses) * 100) : 0;

  const getDifficultyIcon = () => {
    switch (difficulty) {
      case 'easy': return <Target className="w-4 h-4 text-green-600" />;
      case 'hard': return <Zap className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="neo-card bg-white/95 backdrop-blur-sm">
        <CardContent className="p-4 space-y-4">
          <div className="text-center border-b-4 border-black pb-3">
            <h3 className="font-black uppercase tracking-wider text-lg">{playerName}</h3>
            <div className="flex items-center justify-center gap-2 mt-1">
              {getDifficultyIcon()}
              <p className="text-sm font-bold uppercase text-muted-foreground">
                {difficulty} • Round {currentRound}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between p-3 bg-secondary/20 border-2 border-black">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span className="font-bold uppercase text-sm">Score</span>
              </div>
              <div className="text-xl font-black">{score}</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-accent/20 border-2 border-black">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-bold uppercase text-sm">Accuracy</span>
              </div>
              <div className="text-xl font-black">{accuracy}%</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted border-2 border-black">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                <span className="font-bold uppercase text-sm">Guesses</span>
              </div>
              <div className="text-xl font-black">{totalGuesses}</div>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default FloatingStats;
