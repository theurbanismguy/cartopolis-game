
import React, { useState, useEffect } from 'react';
import { City, getRandomCity, Difficulty } from '../data/cities';
import CityMap from './CityMap';
import Leaderboard, { LeaderboardEntry } from './Leaderboard';
import StartScreen from './StartScreen';
import FloatingGuessInput from './FloatingGuessInput';
import FloatingStats from './FloatingStats';
import FloatingControls from './FloatingControls';
import GameEnhancedStats from './GameEnhancedStats';
import TopBar from './TopBar';
import CompactWikipediaCard from './CompactWikipediaCard';
import CityLetterBoxes from './CityLetterBoxes';
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
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showWikipedia, setShowWikipedia] = useState(false);
  
  const {
    score,
    setScore,
    totalGuesses,
    setTotalGuesses,
    currentRound,
    currentStreak,
    setCurrentStreak,
    bestStreak,
    setBestStreak,
    roundStartTime,
    setRoundStartTime,
    totalTimeBonus,
    setTotalTimeBonus,
    resetGame: resetGameState,
    nextRound: nextRoundState,
    calculateTimeBonus,
    getStreakMultiplier
  } = useGameState();

  const {
    hintsUsed,
    revealedLetters,
    hintState,
    useHint,
    resetHints,
    canUseHint
  } = useHintSystem();

  // Load leaderboard from localStorage on component mount
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('cartopolisLeaderboard');
    if (savedLeaderboard) {
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
    setCurrentCity(getRandomCity(selectedDifficulty));
    setGameStarted(true);
    setGameState('guessing');
    setShowAnswer(false);
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
      // Calculate score with bonuses
      let basePoints = isExactMatch ? 10 : 7;
      const timeBonus = calculateTimeBonus(roundStartTime, difficulty);
      const streakMultiplier = getStreakMultiplier(currentStreak);
      const hintPenalty = hintsUsed * 2;
      
      const roundScore = Math.max(1, (basePoints + timeBonus) * streakMultiplier - hintPenalty);
      
      setScore(prev => prev + roundScore);
      setCurrentStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
      setTotalTimeBonus(prev => prev + timeBonus);
      setGameState('correct');
      setShowAnswer(true);
      setShowWikipedia(true);
      
      let message = `CORRECT! +${roundScore} points`;
      if (timeBonus > 0) message += ` (+${timeBonus} speed bonus)`;
      if (streakMultiplier > 1) message += ` (${streakMultiplier}x streak!)`;
      
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
    setCurrentCity(getRandomCity(difficulty));
    setGameState('guessing');
    setShowAnswer(false);
    setShowWikipedia(false);
    resetGameState();
    resetHints();
    toast.success('Game reset! Good luck!');
  };

  const endGame = () => {
    // Save current game to leaderboard before ending
    if (totalGuesses > 0) {
      const accuracy = Math.round((score / Math.max(totalGuesses, 1)) * 10); // Adjust accuracy calculation for new scoring
      const newEntry: LeaderboardEntry = {
        name: playerName,
        score,
        accuracy,
        gamesPlayed: currentRound - 1,
        streak: bestStreak,
        timeBonus: totalTimeBonus
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
            streak: Math.max(existingEntry.streak || 0, bestStreak),
            timeBonus: (existingEntry.timeBonus || 0) + totalTimeBonus
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

    setShowLeaderboard(true);
    toast.success('Game ended! Check the leaderboard to see your ranking.');
  };

  const backToMenu = () => {
    setGameStarted(false);
    setShowLeaderboard(false);
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

  // Start screen
  if (!gameStarted) {
    return <StartScreen onStartGame={startGame} leaderboard={leaderboard} />;
  }

  // Leaderboard screen
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
          onUseHint={handleUseHint}
          hintsUsed={hintsUsed}
          canUseHint={canUseHint}
          gameState={gameState}
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
          timeBonus={totalTimeBonus}
        />
      </div>

      {/* Desktop controls - hide on mobile */}
      <div className="hidden md:block">
        <FloatingControls
          onShowLeaderboard={() => setShowLeaderboard(true)}
          onResetGame={resetGame}
          onEndGame={endGame}
          onBackToMenu={backToMenu}
          onUseHint={handleUseHint}
          hintsUsed={hintsUsed}
          gameState={gameState}
        />
      </div>

      {/* City Letter Boxes */}
      {currentCity && (
        <div className="fixed top-20 md:top-4 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 rounded-none">
            <CityLetterBoxes
              cityName={currentCity.name}
              revealedLetters={revealedLetters}
              showAnswer={showAnswer}
            />
          </div>
        </div>
      )}
      
      <FloatingGuessInput
        onGuess={checkGuess}
        disabled={gameState !== 'guessing'}
        gameState={gameState}
        onNextRound={nextRound}
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
