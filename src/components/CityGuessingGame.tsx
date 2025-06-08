import React, { useState, useEffect } from 'react';
import { City, getRandomCity, Difficulty } from '../data/cities';
import CityMap from './CityMap';
import Leaderboard, { LeaderboardEntry } from './Leaderboard';
import StartScreen from './StartScreen';
import FloatingGuessInput from './FloatingGuessInput';
import FloatingStats from './FloatingStats';
import FloatingControls from './FloatingControls';
import GameEnhancedStats from './GameEnhancedStats';
import MobileGameStats from './MobileGameStats';
import MobileGameControls from './MobileGameControls';
import WikipediaInfo from './WikipediaInfo';
import { toast } from 'sonner';

const CityGuessingGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [gameState, setGameState] = useState<'guessing' | 'correct' | 'incorrect'>('guessing');
  const [score, setScore] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showWikipedia, setShowWikipedia] = useState(false);
  
  // Enhanced gaming features
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [roundStartTime, setRoundStartTime] = useState<number>(0);
  const [totalTimeBonus, setTotalTimeBonus] = useState(0);

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
    setScore(0);
    setTotalGuesses(0);
    setCurrentRound(1);
    setGameState('guessing');
    setShowAnswer(false);
    setCurrentStreak(0);
    setBestStreak(0);
    setHintsUsed(0);
    setTotalTimeBonus(0);
    setRoundStartTime(Date.now());
    toast.success(`Welcome to Cartopolis, ${name}! Good luck exploring!`);
  };

  const calculateTimeBonus = (startTime: number, difficulty: Difficulty): number => {
    const timeTaken = (Date.now() - startTime) / 1000; // in seconds
    const baseTime = difficulty === 'easy' ? 60 : difficulty === 'medium' ? 45 : 30;
    
    if (timeTaken <= baseTime) {
      return Math.max(0, Math.floor((baseTime - timeTaken) / 5)); // 1 point per 5 seconds saved
    }
    return 0;
  };

  const getStreakMultiplier = (streak: number): number => {
    if (streak >= 10) return 5;
    if (streak >= 5) return 3;
    if (streak >= 3) return 2;
    return 1;
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
      let basePoints = isExactMatch ? 10 : 7; // Exact match bonus
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
    setCurrentRound(prev => prev + 1);
    setHintsUsed(0);
    setRoundStartTime(Date.now());
  };

  const resetGame = () => {
    setCurrentCity(getRandomCity(difficulty));
    setGameState('guessing');
    setShowAnswer(false);
    setShowWikipedia(false);
    setScore(0);
    setTotalGuesses(0);
    setCurrentRound(1);
    setCurrentStreak(0);
    setBestStreak(0);
    setHintsUsed(0);
    setTotalTimeBonus(0);
    setRoundStartTime(Date.now());
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

  const useHint = (hintType: string) => {
    if (!currentCity) return;
    
    setHintsUsed(prev => prev + 1);
    
    switch (hintType) {
      case 'continent':
        toast.info(`Hint: This city is in ${currentCity.continent} (-2 points)`);
        break;
      case 'population':
        const popRange = currentCity.population >= 1000000 ? 'over 1 million' : 
                        currentCity.population >= 500000 ? '500K - 1M' : 'under 500K';
        toast.info(`Hint: Population is ${popRange} (-2 points)`);
        break;
      case 'firstletter':
        toast.info(`Hint: City starts with "${currentCity.name[0]}" (-2 points)`);
        break;
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
      
      {/* Mobile-optimized stats - only show on mobile */}
      <MobileGameStats
        score={score}
        totalGuesses={totalGuesses}
        currentRound={currentRound}
        playerName={playerName}
        difficulty={difficulty}
        currentStreak={currentStreak}
        bestStreak={bestStreak}
        timeBonus={totalTimeBonus}
      />

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
      
      {/* Mobile controls - only show on mobile */}
      <MobileGameControls
        onShowLeaderboard={() => setShowLeaderboard(true)}
        onResetGame={resetGame}
        onEndGame={endGame}
        onBackToMenu={backToMenu}
        onUseHint={useHint}
        hintsUsed={hintsUsed}
        gameState={gameState}
      />

      {/* Desktop controls - hide on mobile */}
      <div className="hidden md:block">
        <FloatingControls
          onShowLeaderboard={() => setShowLeaderboard(true)}
          onResetGame={resetGame}
          onEndGame={endGame}
          onBackToMenu={backToMenu}
          onUseHint={useHint}
          hintsUsed={hintsUsed}
          gameState={gameState}
        />
      </div>
      
      <FloatingGuessInput
        onGuess={checkGuess}
        disabled={gameState !== 'guessing'}
        gameState={gameState}
        onNextRound={nextRound}
      />

      {/* Wikipedia Info */}
      {showWikipedia && currentCity && (
        <div className="fixed inset-x-4 bottom-20 md:bottom-4 z-50">
          <WikipediaInfo city={currentCity} show={showWikipedia} />
        </div>
      )}
    </div>
  );
};

export default CityGuessingGame;
