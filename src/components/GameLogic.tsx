import React, { useState, useEffect } from 'react';
import { City, getRandomCity, Difficulty, resetRecentCities } from '../data/cities';
import { LeaderboardEntry } from './Leaderboard';
import StartScreen from './StartScreen';
import EndGameScreen from './EndGameScreen';
import LeaderboardScreen from './LeaderboardScreen';
import GameScreen from './GameScreen';
import { useGameState } from './GameHooks';
import { useHintSystem } from './HintSystem';
import { updatePlayerInLeaderboard } from './GameUtils';
import { toast } from 'sonner';

const GameLogic: React.FC = () => {
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
        streak: bestStreak,
        difficulty: difficulty
      };

      setLeaderboard(prev => updatePlayerInLeaderboard(prev, playerName, newEntry));
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
      <LeaderboardScreen
        leaderboard={leaderboard}
        onBackToGame={() => setShowLeaderboard(false)}
        onNewGame={resetGame}
        onBackToMenu={backToMenu}
      />
    );
  }

  if (!currentCity) return null;

  return (
    <GameScreen
      currentCity={currentCity}
      playerName={playerName}
      difficulty={difficulty}
      score={score}
      totalGuesses={totalGuesses}
      currentRound={currentRound}
      currentStreak={currentStreak}
      bestStreak={bestStreak}
      gameState={gameState}
      showAnswer={showAnswer}
      showWikipedia={showWikipedia}
      revealedLetters={revealedLetters}
      hintsUsed={hintsUsed}
      canUseHint={canUseHint}
      calculateAccuracy={calculateAccuracy}
      onGuess={checkGuess}
      onNextRound={nextRound}
      onShowLeaderboard={() => setShowLeaderboard(true)}
      onEndGame={endGame}
      onBackToMenu={backToMenu}
      onUseHint={handleUseHint}
      onCloseWikipedia={() => setShowWikipedia(false)}
    />
  );
};

export default GameLogic;
