
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, RefreshCw, X, Home, Lightbulb, MapPin, Users, Hash } from 'lucide-react';

interface FloatingControlsProps {
  onShowLeaderboard: () => void;
  onResetGame: () => void;
  onEndGame: () => void;
  onBackToMenu: () => void;
  onUseHint: (hintType: string) => void;
  hintsUsed: number;
  gameState: 'guessing' | 'correct' | 'incorrect';
}

const FloatingControls: React.FC<FloatingControlsProps> = ({
  onShowLeaderboard,
  onResetGame,
  onEndGame,
  onBackToMenu,
  onUseHint,
  hintsUsed,
  gameState
}) => {
  const canUseHints = gameState === 'guessing' && hintsUsed < 3;

  return (
    <div className="fixed top-6 left-4 md:left-6 z-50">
      <div className="neo-card bg-white/95 backdrop-blur-sm">
        <CardContent className="p-2 md:p-3">
          <div className="flex flex-col gap-2">
            {/* Hint Section */}
            {gameState === 'guessing' && (
              <div className="border-b-2 border-black pb-2 mb-2">
                <div className="text-xs font-bold uppercase text-center mb-2">
                  HINTS ({hintsUsed}/3)
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => onUseHint('continent')}
                    disabled={!canUseHints}
                    className={`neo-button-accent text-xs px-2 py-1 flex items-center gap-1 ${
                      !canUseHints ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    CONTINENT
                  </button>
                  <button
                    onClick={() => onUseHint('population')}
                    disabled={!canUseHints}
                    className={`neo-button-accent text-xs px-2 py-1 flex items-center gap-1 ${
                      !canUseHints ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Users className="w-3 h-3" />
                    POPULATION
                  </button>
                  <button
                    onClick={() => onUseHint('firstletter')}
                    disabled={!canUseHints}
                    className={`neo-button-accent text-xs px-2 py-1 flex items-center gap-1 ${
                      !canUseHints ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Hash className="w-3 h-3" />
                    FIRST LETTER
                  </button>
                </div>
              </div>
            )}
            
            {/* Main Controls */}
            <button
              onClick={onShowLeaderboard}
              className="neo-button-accent text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 flex items-center gap-1 md:gap-2"
            >
              <Trophy className="w-3 md:w-4 h-3 md:h-4" />
              LEADERBOARD
            </button>
            
            <button
              onClick={onResetGame}
              className="neo-button-secondary text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 flex items-center gap-1 md:gap-2"
            >
              <RefreshCw className="w-3 md:w-4 h-3 md:h-4" />
              RESET
            </button>
            
            <button
              onClick={onBackToMenu}
              className="neo-button text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 flex items-center gap-1 md:gap-2"
            >
              <Home className="w-3 md:w-4 h-3 md:h-4" />
              MENU
            </button>
            
            <button
              onClick={onEndGame}
              className="neo-button text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 flex items-center gap-1 md:gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              <X className="w-3 md:w-4 h-3 md:h-4" />
              END GAME
            </button>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default FloatingControls;
