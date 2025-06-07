
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, RefreshCw, X } from 'lucide-react';

interface FloatingControlsProps {
  onShowLeaderboard: () => void;
  onResetGame: () => void;
  onEndGame: () => void;
}

const FloatingControls: React.FC<FloatingControlsProps> = ({
  onShowLeaderboard,
  onResetGame,
  onEndGame
}) => {
  return (
    <div className="fixed top-6 left-6 z-50">
      <Card className="bg-white/90 backdrop-blur-md border-white/20 shadow-xl">
        <CardContent className="p-3">
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onShowLeaderboard}
              className="bg-white/80 hover:bg-white/90 border-gray-200"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onResetGame}
              className="bg-white/80 hover:bg-white/90 border-gray-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onEndGame}
              className="bg-white/80 hover:bg-red-50 border-gray-200 text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4 mr-2" />
              End Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloatingControls;
