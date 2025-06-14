
import React from 'react';
import { Lightbulb } from 'lucide-react';

interface FloatingActionButtonsProps {
  onUseHint: () => void;
  onEndGame: () => void;
  hintsUsed: number;
  canUseHint: boolean;
  gameState: 'guessing' | 'correct' | 'incorrect';
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onUseHint,
  onEndGame,
  hintsUsed,
  canUseHint,
  gameState
}) => {
  return (
    <div className="fixed top-16 md:top-4 right-4 z-[60] space-y-3">
      {/* Hint Button */}
      <button
        onClick={onUseHint}
        disabled={!canUseHint || gameState !== 'guessing'}
        className={`w-14 h-14 rounded-full border-2 border-black font-bold flex flex-col items-center justify-center transition-all duration-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
          canUseHint && gameState === 'guessing'
            ? 'bg-accent/90 text-accent-foreground backdrop-blur-sm hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]' 
            : 'opacity-50 cursor-not-allowed bg-muted/90 backdrop-blur-sm'
        }`}
      >
        <Lightbulb className="w-5 h-5" />
        <span className="text-xs">{hintsUsed}/4</span>
      </button>
      
      {/* End Game Button */}
      <button
        onClick={onEndGame}
        className="w-14 h-14 rounded-full bg-destructive/90 text-destructive-foreground backdrop-blur-sm border-2 border-black font-bold flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
      >
        <span className="text-xs font-black uppercase">END</span>
      </button>
    </div>
  );
};

export default FloatingActionButtons;
