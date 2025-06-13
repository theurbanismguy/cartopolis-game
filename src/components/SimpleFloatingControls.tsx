
import React from 'react';
import { Trophy, Home, X, Lightbulb } from 'lucide-react';

interface SimpleFloatingControlsProps {
  onShowLeaderboard: () => void;
  onEndGame: () => void;
  onBackToMenu: () => void;
  onUseHint: () => void;
  hintsUsed: number;
  canUseHint: boolean;
  gameState: 'guessing' | 'correct' | 'incorrect';
}

const SimpleFloatingControls: React.FC<SimpleFloatingControlsProps> = ({
  onShowLeaderboard,
  onEndGame,
  onBackToMenu,
  onUseHint,
  hintsUsed,
  canUseHint,
  gameState
}) => {
  return (
    <div className="fixed top-4 right-4 z-40 space-y-2 hidden md:block">
      {/* Hint Button - Always visible now */}
      <button
        onClick={onUseHint}
        disabled={!canUseHint || gameState !== 'guessing'}
        className={`w-full px-4 py-3 border-2 border-black font-bold uppercase tracking-wider text-sm flex items-center gap-2 transition-all duration-100 ${
          canUseHint && gameState === 'guessing'
            ? 'bg-accent/90 text-accent-foreground backdrop-blur-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]' 
            : 'opacity-50 cursor-not-allowed bg-muted/90 backdrop-blur-sm'
        }`}
      >
        <Lightbulb className="w-4 h-4" />
        HINT ({hintsUsed}/4)
      </button>
      
      {/* Main Controls */}
      <button
        onClick={onShowLeaderboard}
        className="w-full bg-white/90 backdrop-blur-sm border-2 border-black px-4 py-3 font-bold uppercase tracking-wider text-sm flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100"
      >
        <Trophy className="w-4 h-4" />
        LEADERBOARD
      </button>
      
      <button
        onClick={onBackToMenu}
        className="w-full bg-white/90 backdrop-blur-sm border-2 border-black px-4 py-3 font-bold uppercase tracking-wider text-sm flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100"
      >
        <Home className="w-4 h-4" />
        HOME
      </button>
      
      <button
        onClick={onEndGame}
        className="w-full bg-destructive/90 text-destructive-foreground backdrop-blur-sm border-2 border-black px-4 py-3 font-bold uppercase tracking-wider text-sm flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100"
      >
        <X className="w-4 h-4" />
        END GAME
      </button>
    </div>
  );
};

export default SimpleFloatingControls;
