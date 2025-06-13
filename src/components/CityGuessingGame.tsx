import React, { useState, useEffect } from 'react';
import { City, getRandomCity, Difficulty, resetRecentCities } from '../data/cities';
import CityMap from './CityMap';
import Leaderboard, { LeaderboardEntry } from './Leaderboard';
import StartScreen from './StartScreen';
import InteractiveCityInput from './InteractiveCityInput';
import SimpleFloatingControls from './SimpleFloatingControls';
import GameEnhancedStats from './GameEnhancedStats';
import TopBar from './TopBar';
import CompactWikipediaCard from './CompactWikipediaCard';
import FloatingActionButtons from './FloatingActionButtons';
import EndGameScreen from './EndGameScreen';
import { useGameState } from './GameHooks';
import { useHintSystem } from './HintSystem';
import { toast } from 'sonner';

const CityGuessingGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [gameState, setGameState] = useState<'guessing' | 'correct' | 'incorrect'>('guessing');
  const [showAnswer, setShowAnswer] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showEndGameScreen, setShowEndGameScreen] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showWikipedia, setShowWikipedia] = useState(false);
  
  const {
    score,
    setScore,
    totalGuesses,
    setTotalGuesses,
    correctGuesses,
    setCorrectGuesses,
    currentRound,
    currentStreak,
    setCurrentStreak,
    bestStreak,
    setBestStreak,
    roundStartTime,
    setRoundStartTime,
    resetGame: resetGameState,
    nextRound: nextRoundState,
    calculateAccuracy
  } = useGameState();

  const {
    hintsUsed,
    revealedLetters,
    hintState,
    useHint,
    resetHints,
    canUseHint
  } = useHintSystem();

  // Helper function to check if leaderboard should be reset (daily at 12 PM CET)
  const shouldResetLeaderboard = (lastResetTime: string | null): boolean => {
    if (!lastResetTime) return true;
    
    const now = new Date();
    const lastReset = new Date(lastResetTime);
    const today12PM = new Date();
    today12PM.setHours(11, 0, 0, 0); // 12 PM CET = 11 AM UTC
    
    // If it's past 12 PM today and last reset was before today 12 PM
    return now >= today12PM && lastReset < today12PM;
  };

  // Load leaderboard from localStorage on component mount with daily reset check
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('cartopolisLeaderboard');
    const lastResetTime = localStorage.getItem('cartopolisLastReset');
    
    if (shouldResetLeaderboard(lastResetTime)) {
      // Reset leaderboard and update reset time
      setLeaderboard([]);
      localStorage.setItem('cartopolisLastReset', new Date().toISOString());
      localStorage.removeItem('cartopolisLeaderboard');
    } else if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  // Save leaderboard to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartopolisLeaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  const startGame = (name: string, selectedDifficulty: Difficulty) => {
    setPlayerName(name);
    setDifficulty(selectedDifficulty);
    resetRecentCities(); // Reset the recent cities tracking
    setCurrentCity(getRandomCity(selectedDifficulty));
    setGameStarted(true);
    setGameState('guessing');
    setShowAnswer(false);
    setShowEndGameScreen(false);
    resetGameState();
    resetHints();
    setRoundStartTime(Date.now());
    toast.success(`Welcome to Cartopolis, ${name}! Good luck exploring!`);
  };

  const checkGuess = (guess: string) => {
    if (!currentCity) return;

    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedCity = currentCity.name.toLowerCase().trim();
    const normalizedCountry = currentCity.country.toLowerCase().trim();
    
    const isExactMatch = normalizedGuess === normalizedCity;
    const isPartialMatch = 
      normalizedGuess === `${normalizedCity}, ${normalizedCountry}` ||
      normalizedGuess.includes(normalizedCity);

    setTotalGuesses(prev => prev + 1);
    
    if (isExactMatch || isPartialMatch) {
      // Simplified scoring: 5 points minus 1 point per hint used
      const roundScore = Math.max(1, 5 - hintsUsed);
      
      setScore(prev => prev + roundScore);
      setCorrectGuesses(prev => prev + 1);
      setCurrentStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
      setGameState('correct');
      setShowAnswer(true);
      setShowWikipedia(true);
      
      let message = `CORRECT! +${roundScore} points`;
      if (hintsUsed > 0) message += ` (-${hintsUsed} for hints)`;
      
      toast.success(message);
    } else {
      setCurrentStreak(0);
      setGameState('incorrect');
      setShowAnswer(true);
      setShowWikipedia(true);
      toast.error(`WRONG! The answer was ${currentCity.name}, ${currentCity.country}`);
    }
  };

  const nextRound = () => {
    setCurrentCity(getRandomCity(difficulty));
    setGameState('guessing');
    setShowAnswer(false);
    setShowWikipedia(false);
    resetHints();
    nextRoundState();
  };

  const resetGame = () => {
    resetRecentCities(); // Reset the recent cities tracking
    setCurrentCity(getRandomCity(difficulty));
    setGameState('guessing');
    setShowAnswer(false);
    setShowWikipedia(false);
    setShowEndGameScreen(false);
    resetGameState();
    resetHints();
    toast.success('Game reset! Good luck!');
  };

  const endGame = () => {
    // Save current game to leaderboard before ending
    if (totalGuesses > 0) {
      const accuracy = calculateAccuracy();
      const newEntry: LeaderboardEntry = {
        name: playerName,
        score,
        accuracy,
        gamesPlayed: currentRound - 1,
        streak: bestStreak
      };

      setLeaderboard(prev => {
        const existingPlayerIndex = prev.findIndex(entry => entry.name === playerName);
        if (existingPlayerIndex >= 0) {
          const updatedLeaderboard = [...prev];
          const existingEntry = updatedLeaderboard[existingPlayerIndex];
          updatedLeaderboard[existingPlayerIndex] = {
            ...existingEntry,
            score: Math.max(existingEntry.score, score),
            accuracy: Math.max(existingEntry.accuracy, accuracy),
            gamesPlayed: existingEntry.gamesPlayed + (currentRound - 1),
            streak: Math.max(existingEntry.streak || 0, bestStreak)
          };
          return updatedLeaderboard.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return (b.streak || 0) - (a.streak || 0);
          });
        } else {
          const newLeaderboard = [...prev, newEntry];
          return newLeaderboard.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return (b.streak || 0) - (a.streak || 0);
          });
        }
      });
    }

    setShowEndGameScreen(true);
    toast.success('Game ended! Check your final stats and ranking.');
  };

  const backToMenu = () => {
    setGameStarted(false);
    setShowLeaderboard(false);
    setShowEndGameScreen(false);
    setCurrentCity(null);
    setGameState('guessing');
    setShowAnswer(false);
  };

  const handleUseHint = () => {
    if (!currentCity || !canUseHint) return;
    
    const hintMessage = useHint(currentCity);
    if (hintMessage) {
      toast.info(hintMessage);
    }
  };

  const startNewGame = () => {
    resetGame();
    setShowEndGameScreen(false);
  };

  // Start screen
  if (!gameStarted) {
    return <StartScreen onStartGame={startGame} leaderboard={leaderboard} />;
  }

  // End game screen
  if (showEndGameScreen) {
    return (
      <EndGameScreen
        playerName={playerName}
        finalScore={score}
        accuracy={calculateAccuracy()}
        bestStreak={bestStreak}
        gamesPlayed={currentRound - 1}
        leaderboard={leaderboard}
        onNewGame={startNewGame}
        onBackToMenu={backToMenu}
      />
    );
  }

  // Leaderboard screen (only when accessed during game, not after end game)
  if (showLeaderboard) {
    return (
      <div className="min-h-screen neo-gradient-bg p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-black neo-text-shadow text-white uppercase tracking-wider">
              HALL OF FAME
            </h1>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              <button 
                onClick={() => setShowLeaderboard(false)}
                className="neo-button-secondary px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
              >
                BACK TO GAME
              </button>
              <button 
                onClick={resetGame}
                className="neo-button-accent px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
              >
                NEW GAME
              </button>
              <button 
                onClick={backToMenu}
                className="neo-button px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
              >
                MAIN MENU
              </button>
            </div>
          </div>
          <div className="neo-card bg-white/95">
            <Leaderboard entries={leaderboard} />
          </div>
        </div>
      </div>
    );
  }

  if (!currentCity) return null;

  const currentAccuracy = calculateAccuracy();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full-screen map */}
      <CityMap city={currentCity} showAnswer={showAnswer} difficulty={difficulty} />
      
      {/* Mobile TopBar - only show on mobile */}
      <div className="md:hidden">
        <TopBar
          playerName={playerName}
          score={score}
          currentRound={currentRound}
          currentStreak={currentStreak}
          onShowLeaderboard={() => setShowLeaderboard(true)}
          onEndGame={endGame}
          onBackToMenu={backToMenu}
          accuracy={currentAccuracy}
        />
      </div>

      {/* Desktop stats - hide on mobile */}
      <div className="hidden md:block">
        <GameEnhancedStats
          score={score}
          totalGuesses={totalGuesses}
          currentRound={currentRound}
          playerName={playerName}
          difficulty={difficulty}
          currentStreak={currentStreak}
          bestStreak={bestStreak}
        />
      </div>

      {/* Desktop controls - hide on mobile */}
      <div className="hidden md:block">
        <SimpleFloatingControls
          onShowLeaderboard={() => setShowLeaderboard(true)}
          onEndGame={endGame}
          onBackToMenu={backToMenu}
          onUseHint={handleUseHint}
          hintsUsed={hintsUsed}
          canUseHint={canUseHint}
          gameState={gameState}
        />
      </div>

      {/* Floating Action Buttons - visible on all screen sizes */}
      <FloatingActionButtons
        onUseHint={handleUseHint}
        onEndGame={endGame}
        hintsUsed={hintsUsed}
        canUseHint={canUseHint}
        gameState={gameState}
      />

      {/* Interactive City Input */}
      <InteractiveCityInput
        cityName={currentCity.name}
        revealedLetters={revealedLetters}
        onGuess={checkGuess}
        disabled={gameState !== 'guessing'}
        gameState={gameState}
        onNextRound={nextRound}
        showAnswer={showAnswer}
      />

      {/* Compact Wikipedia Card */}
      {showWikipedia && currentCity && (
        <CompactWikipediaCard 
          city={currentCity} 
          show={showWikipedia} 
          onClose={() => setShowWikipedia(false)}
        />
      )}
    </div>
  );
};

export default CityGuessingGame;
