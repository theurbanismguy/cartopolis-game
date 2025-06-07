
import React, { useState, useEffect } from 'react';
import { City, getRandomCity } from '../data/cities';
import CityMap from './CityMap';
import Leaderboard, { LeaderboardEntry } from './Leaderboard';
import PlayerNameInput from './PlayerNameInput';
import FloatingGuessInput from './FloatingGuessInput';
import FloatingStats from './FloatingStats';
import FloatingControls from './FloatingControls';
import { toast } from 'sonner';

const CityGuessingGame: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>('');
  const [currentCity, setCurrentCity] = useState<City>(getRandomCity());
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

  const checkGuess = (guess: string) => {
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
      toast.success(`Correct! It's ${currentCity.name}, ${currentCity.country}!`);
    } else {
      setGameState('incorrect');
      setShowAnswer(true);
      toast.error(`Incorrect! The answer was ${currentCity.name}, ${currentCity.country}`);
    }
  };

  const nextRound = () => {
    setCurrentCity(getRandomCity());
    setGameState('guessing');
    setShowAnswer(false);
    setCurrentRound(prev => prev + 1);
  };

  const resetGame = () => {
    setCurrentCity(getRandomCity());
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
          return updatedLeaderboard;
        } else {
          return [...prev, newEntry];
        }
      });
    }

    setShowLeaderboard(true);
    toast.success('Game ended! Check the leaderboard to see your ranking.');
  };

  const handlePlayerSet = (name: string) => {
    setPlayerName(name);
  };

  if (!playerName) {
    return <PlayerNameInput onPlayerSet={handlePlayerSet} />;
  }

  if (showLeaderboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              City Explorer Leaderboard
            </h1>
            <div className="flex justify-center gap-2">
              <button 
                onClick={() => setShowLeaderboard(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Game
              </button>
              <button 
                onClick={resetGame}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                New Game
              </button>
            </div>
          </div>
          <Leaderboard entries={leaderboard} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full-screen map */}
      <CityMap city={currentCity} showAnswer={showAnswer} />
      
      {/* Floating UI components */}
      <FloatingStats
        score={score}
        totalGuesses={totalGuesses}
        currentRound={currentRound}
        playerName={playerName}
      />
      
      <FloatingControls
        onShowLeaderboard={() => setShowLeaderboard(true)}
        onResetGame={resetGame}
        onEndGame={endGame}
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
