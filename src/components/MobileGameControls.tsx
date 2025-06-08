
import React, { useState } from 'react';
import { Settings, X, Home, RefreshCw, Trophy, MapPin, Users, Hash } from 'lucide-react';

interface MobileGameControlsProps {
  onShowLeaderboard: () => void;
  onResetGame: () => void;
  onEndGame: () => void;
  onBackToMenu: () => void;
  onUseHint: (hintType: string) => void;
  hintsUsed: number;
  gameState: 'guessing' | 'correct' | 'incorrect';
}

const MobileGameControls: React.FC<MobileGameControlsProps> = ({
  onShowLeaderboard,
  onResetGame,
  onEndGame,
  onBackToMenu,
  onUseHint,
  hintsUsed,
  gameState
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const canUseHints = gameState === 'guessing' && hintsUsed < 3;

  return (
    <div className="fixed bottom-2 left-2 z-40 md:hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-white/95 backdrop-blur-sm border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-2"
      >
        {isExpanded ? (
          <X className="w-5 h-5" />
        ) : (
          <Settings className="w-5 h-5" />
        )}
      </button>

      {/* Expanded Menu */}
      {isExpanded && (
        <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-2 space-y-2 min-w-[200px]">
          {/* Hints Section */}
          {gameState === 'guessing' && (
            <div className="border-b border-black pb-2 mb-2">
              <div className="text-xs font-bold uppercase mb-2">
                HINTS ({hintsUsed}/3)
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => onUseHint('continent')}
                  disabled={!canUseHints}
                  className={`w-full text-left text-xs px-2 py-1 border border-black bg-accent/20 hover:bg-accent/40 flex items-center gap-2 ${
                    !canUseHints ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  CONTINENT
                </button>
                <button
                  onClick={() => onUseHint('population')}
                  disabled={!canUseHints}
                  className={`w-full text-left text-xs px-2 py-1 border border-black bg-accent/20 hover:bg-accent/40 flex items-center gap-2 ${
                    !canUseHints ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Users className="w-3 h-3" />
                  POPULATION
                </button>
                <button
                  onClick={() => onUseHint('firstletter')}
                  disabled={!canUseHints}
                  className={`w-full text-left text-xs px-2 py-1 border border-black bg-accent/20 hover:bg-accent/40 flex items-center gap-2 ${
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
            className="w-full text-left text-sm px-2 py-2 border border-black bg-secondary/20 hover:bg-secondary/40 flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            LEADERBOARD
          </button>
          
          <button
            onClick={onResetGame}
            className="w-full text-left text-sm px-2 py-2 border border-black bg-muted hover:bg-muted/80 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            RESET
          </button>
          
          <button
            onClick={onBackToMenu}
            className="w-full text-left text-sm px-2 py-2 border border-black bg-muted hover:bg-muted/80 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            MENU
          </button>
          
          <button
            onClick={onEndGame}
            className="w-full text-left text-sm px-2 py-2 border border-black bg-destructive/20 hover:bg-destructive/40 text-destructive flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            END GAME
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileGameControls;
