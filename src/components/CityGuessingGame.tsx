
import React, { useState, useEffect } from 'react';
import { City, getRandomCity, Difficulty } from '../data/cities';
import CityMap from './CityMap';
import Leaderboard, { LeaderboardEntry } from './Leaderboard';
import StartScreen from './StartScreen';
import FloatingGuessInput from './FloatingGuessInput';
import FloatingStats from './FloatingStats';
import FloatingControls from './FloatingControls';
import { toast } from 'sonner';

const CityGuessingGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [mapView, setMapView] = useState<'satellite' | 'vector'>('satellite');
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [gameState, setGameState] = useState<'guessing' | 'correct' | 'incorrect'>('guessing');
  const [score, setScore] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard from localStorage on component mount
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('cityExplorerLeaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  // Save leaderboard to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cityExplorerLeaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  const startGame = (name: string, selectedDifficulty: Difficulty, selectedMapView: 'satellite' | 'vector') => {
    setPlayerName(name);
    setDifficulty(selectedDifficulty);
    setMapView(selectedMapView);
    setCurrentCity(getRandomCity(selectedDifficulty));
    setGameStarted(true);
    setScore(0);
    setTotalGuesses(0);
    setCurrentRound(1);
    setGameState('guessing');
    setShowAnswer(false);
    toast.success(`Welcome ${name}! Good luck exploring!`);
  };

  const toggleMapView = () => {
    setMapView(prev => prev === 'satellite' ? 'vector' : 'satellite');
    toast.success(`Switched to ${mapView === 'satellite' ? 'vector' : 'satellite'} view!`);
  };

  const checkGuess = (guess: string) => {
    if (!currentCity) return;

    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedCity = currentCity.name.toLowerCase().trim();
    const normalizedCountry = currentCity.country.toLowerCase().trim();
    
    const isCorrect = 
      normalizedGuess === normalizedCity ||
      normalizedGuess === `${normalizedCity}, ${normalizedCountry}` ||
      normalizedGuess.includes(normalizedCity);

    setTotalGuesses(prev => prev + 1);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setGameState('correct');
      setShowAnswer(true);
      toast.success(`CORRECT! It's ${currentCity.name}, ${currentCity.country}!`);
    } else {
      setGameState('incorrect');
      setShowAnswer(true);
      toast.error(`WRONG! The answer was ${currentCity.name}, ${currentCity.country}`);
    }
  };

  const nextRound = () => {
    setCurrentCity(getRandomCity(difficulty));
    setGameState('guessing');
    setShowAnswer(false);
    setCurrentRound(prev => prev + 1);
  };

  const resetGame = () => {
    setCurrentCity(getRandomCity(difficulty));
    setGameState('guessing');
    setShowAnswer(false);
    setScore(0);
    setTotalGuesses(0);
    setCurrentRound(1);
    toast.success('Game reset! Good luck!');
  };

  const endGame = () => {
    // Save current game to leaderboard before ending
    if (totalGuesses > 0) {
      const accuracy = Math.round((score / totalGuesses) * 100);
      const newEntry: LeaderboardEntry = {
        name: playerName,
        score,
        accuracy,
        gamesPlayed: currentRound - 1
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
            gamesPlayed: existingEntry.gamesPlayed + (currentRound - 1)
          };
          return updatedLeaderboard.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return b.accuracy - a.accuracy;
          });
        } else {
          const newLeaderboard = [...prev, newEntry];
          return newLeaderboard.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return b.accuracy - a.accuracy;
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
            <h1 className="text-6xl font-black neo-text-shadow text-white uppercase tracking-wider">
              HALL OF FAME
            </h1>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setShowLeaderboard(false)}
                className="neo-button-secondary px-6 py-3"
              >
                BACK TO GAME
              </button>
              <button 
                onClick={resetGame}
                className="neo-button-accent px-6 py-3"
              >
                NEW GAME
              </button>
              <button 
                onClick={backToMenu}
                className="neo-button px-6 py-3"
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
      <CityMap city={currentCity} showAnswer={showAnswer} mapView={mapView} />
      
      {/* Floating UI components */}
      <FloatingStats
        score={score}
        totalGuesses={totalGuesses}
        currentRound={currentRound}
        playerName={playerName}
        difficulty={difficulty}
      />
      
      <FloatingControls
        onShowLeaderboard={() => setShowLeaderboard(true)}
        onResetGame={resetGame}
        onEndGame={endGame}
        onToggleMapView={toggleMapView}
        onBackToMenu={backToMenu}
        mapView={mapView}
      />
      
      <FloatingGuessInput
        onGuess={checkGuess}
        disabled={gameState !== 'guessing'}
        gameState={gameState}
        onNextRound={nextRound}
      />
    </div>
  );
};

export default CityGuessingGame;
