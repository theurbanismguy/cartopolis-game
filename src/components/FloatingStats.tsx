
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Zap } from 'lucide-react';

interface FloatingStatsProps {
  score: number;
  totalGuesses: number;
  currentRound: number;
  playerName: string;
}

const FloatingStats: React.FC<FloatingStatsProps> = ({ 
  score, 
  totalGuesses, 
  currentRound, 
  playerName 
}) => {
  const accuracy = totalGuesses > 0 ? Math.round((score / totalGuesses) * 100) : 0;

  return (
    <div className="fixed top-6 right-6 z-50">
      <Card className="bg-white/90 backdrop-blur-md border-white/20 shadow-xl">
        <CardContent className="p-4 space-y-4">
          <div className="text-center">
            <h3 className="font-semibold text-gray-800">{playerName}</h3>
            <p className="text-xs text-gray-500">Round {currentRound}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-lg font-bold text-gray-800">{score}</div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-lg font-bold text-gray-800">{accuracy}%</div>
                <div className="text-xs text-gray-500">Accuracy</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-lg font-bold text-gray-800">{totalGuesses}</div>
                <div className="text-xs text-gray-500">Total Guesses</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloatingStats;
