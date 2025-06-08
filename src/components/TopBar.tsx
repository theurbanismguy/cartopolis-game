
import React, { useState } from 'react';
import { Settings, X, MapPin, Users, Hash, Trophy, RefreshCw, Home } from 'lucide-react';

interface TopBarProps {
  playerName: string;
  score: number;
  currentRound: number;
  currentStreak: number;
  onShowLeaderboard: () => void;
  onResetGame: () => void;
  onEndGame: () => void;
  onBackToMenu: () => void;
  onUseHint: (hintType: string) => void;
  hintsUsed: number;
  gameState: 'guessing' | 'correct' | 'incorrect';
}

const TopBar: React.FC<TopBarProps> = ({
  playerName,
  score,
  currentRound,
  currentStreak,
  onShowLeaderboard,
  onResetGame,
  onEndGame,
  onBackToMenu,
  onUseHint,
  hintsUsed,
  gameState
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const canUseHints = gameState === 'guessing' && hintsUsed < 3;

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
              className="p-1 bg-white border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
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
          <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-[200px]">
            <div className="p-2 space-y-2">
              {/* Hints Section */}
              {gameState === 'guessing' && (
                <div className="border-b border-black pb-2 mb-2">
                  <div className="text-xs font-bold uppercase mb-2">
                    HINTS ({hintsUsed}/3)
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onUseHint('continent');
                        setIsMenuOpen(false);
                      }}
                      disabled={!canUseHints}
                      className={`w-full text-left text-xs px-2 py-1 border border-black bg-accent/20 hover:bg-accent/40 flex items-center gap-2 ${
                        !canUseHints ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <MapPin className="w-3 h-3" />
                      CONTINENT
                    </button>
                    <button
                      onClick={() => {
                        onUseHint('population');
                        setIsMenuOpen(false);
                      }}
                      disabled={!canUseHints}
                      className={`w-full text-left text-xs px-2 py-1 border border-black bg-accent/20 hover:bg-accent/40 flex items-center gap-2 ${
                        !canUseHints ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Users className="w-3 h-3" />
                      POPULATION
                    </button>
                    <button
                      onClick={() => {
                        onUseHint('firstletter');
                        setIsMenuOpen(false);
                      }}
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
                onClick={() => {
                  onShowLeaderboard();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-sm px-2 py-2 border border-black bg-secondary/20 hover:bg-secondary/40 flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                LEADERBOARD
              </button>
              
              <button
                onClick={() => {
                  onResetGame();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-sm px-2 py-2 border border-black bg-muted hover:bg-muted/80 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                RESET
              </button>
              
              <button
                onClick={() => {
                  onBackToMenu();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-sm px-2 py-2 border border-black bg-muted hover:bg-muted/80 flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                MENU
              </button>
              
              <button
                onClick={() => {
                  onEndGame();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-sm px-2 py-2 border border-black bg-destructive/20 hover:bg-destructive/40 text-destructive flex items-center gap-2"
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
