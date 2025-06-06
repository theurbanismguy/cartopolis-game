
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Zap } from 'lucide-react';

interface GameStatsProps {
  score: number;
  totalGuesses: number;
  currentRound: number;
}

const GameStats: React.FC<GameStatsProps> = ({ score, totalGuesses, currentRound }) => {
  const accuracy = totalGuesses > 0 ? Math.round((score / totalGuesses) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
          <div className="text-2xl font-bold">{score}</div>
          <div className="text-xs text-muted-foreground">Score</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <Target className="w-6 h-6 text-blue-500 mb-2" />
          <div className="text-2xl font-bold">{accuracy}%</div>
          <div className="text-xs text-muted-foreground">Accuracy</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <Zap className="w-6 h-6 text-green-500 mb-2" />
          <div className="text-2xl font-bold">{currentRound}</div>
          <div className="text-xs text-muted-foreground">Round</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameStats;
