
import React, { useState } from 'react';
import { Settings, X, Trophy, Home, Lightbulb } from 'lucide-react';

interface TopBarProps {
  playerName: string;
  score: number;
  currentRound: number;
  currentStreak: number;
  onShowLeaderboard: () => void;
  onEndGame: () => void;
  onBackToMenu: () => void;
  onUseHint: () => void;
  hintsUsed: number;
  canUseHint: boolean;
  gameState: 'guessing' | 'correct' | 'incorrect';
}

const TopBar: React.FC<TopBarProps> = ({
  playerName,
  score,
  currentRound,
  currentStreak,
  onShowLeaderboard,
  onEndGame,
  onBackToMenu,
  onUseHint,
  hintsUsed,
  canUseHint,
  gameState
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getStreakColor = (streak: number) => {
    if (streak >= 10) return 'text-red-500';
    if (streak >= 5) return 'text-orange-500';
    if (streak >= 3) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-white/95 backdrop-blur-sm border-b-2 border-black">
          <div className="flex items-center justify-between px-3 py-2">
            {/* Left side - Player info */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="text-sm font-black uppercase truncate max-w-[100px]">
                {playerName}
              </div>
              <div className="text-xs font-bold text-muted-foreground">
                R{currentRound}
              </div>
            </div>
            
            {/* Center - Score and streak */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Trophy className="w-3 h-3 text-accent" />
                <span className="text-sm font-black">{score}</span>
              </div>
              
              {currentStreak > 0 && (
                <div className="flex items-center gap-1">
                  <span className={`text-sm font-black ${getStreakColor(currentStreak)}`}>
                    🔥{currentStreak}
                  </span>
                </div>
              )}
            </div>
            
            {/* Right side - Menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 bg-white border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Settings className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="fixed top-12 right-2 z-50 md:hidden">
          <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[200px]">
            <div className="p-2 space-y-2">
              {/* Hint Button - Always visible now */}
              <button
                onClick={() => {
                  if (canUseHint && gameState === 'guessing') {
                    onUseHint();
                  }
                  setIsMenuOpen(false);
                }}
                disabled={!canUseHint || gameState !== 'guessing'}
                className={`w-full text-left text-sm px-3 py-3 border-2 border-black font-bold uppercase tracking-wider flex items-center justify-between transition-all duration-100 ${
                  canUseHint && gameState === 'guessing'
                    ? 'bg-accent/90 hover:bg-accent text-accent-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]' 
                    : 'opacity-50 cursor-not-allowed bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  HINT
                </div>
                <span className="text-xs">({hintsUsed}/4)</span>
              </button>
              
              {/* Main Controls */}
              <button
                onClick={() => {
                  onShowLeaderboard();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-sm px-3 py-3 border-2 border-black bg-secondary/20 hover:bg-secondary/40 font-bold uppercase tracking-wider flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100"
              >
                <Trophy className="w-4 h-4" />
                LEADERBOARD
              </button>
              
              <button
                onClick={() => {
                  onBackToMenu();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-sm px-3 py-3 border-2 border-black bg-primary/20 hover:bg-primary/40 font-bold uppercase tracking-wider flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100"
              >
                <Home className="w-4 h-4" />
                HOME
              </button>
              
              <button
                onClick={() => {
                  onEndGame();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-sm px-3 py-3 border-2 border-black bg-destructive/20 hover:bg-destructive/40 text-destructive font-bold uppercase tracking-wider flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100"
              >
                <X className="w-4 h-4" />
                END GAME
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default TopBar;
