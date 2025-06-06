
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { City, getRandomCity } from '../data/cities';
import CityMap from './CityMap';
import GuessInput from './GuessInput';
import WikipediaInfo from './WikipediaInfo';
import GameStats from './GameStats';
import Leaderboard, { LeaderboardEntry } from './Leaderboard';
import PlayerNameInput from './PlayerNameInput';
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
      toast.success(`Correct! It's ${currentCity.name}, ${currentCity.country}!`, {
        icon: <CheckCircle className="w-4 h-4" />
      });
    } else {
      setGameState('incorrect');
      setShowAnswer(true);
      toast.error(`Incorrect! The answer was ${currentCity.name}, ${currentCity.country}`, {
        icon: <XCircle className="w-4 h-4" />
      });
    }
  };

  const nextRound = () => {
    setCurrentCity(getRandomCity());
    setGameState('guessing');
    setShowAnswer(false);
    setCurrentRound(prev => prev + 1);
  };

  const resetGame = () => {
    // Save current game to leaderboard before resetting
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

    setCurrentCity(getRandomCity());
    setGameState('guessing');
    setShowAnswer(false);
    setScore(0);
    setTotalGuesses(0);
    setCurrentRound(1);
    toast.success('Game reset! Good luck!');
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
            <Button onClick={() => setShowLeaderboard(false)}>
              Back to Game
            </Button>
          </div>
          <Leaderboard entries={leaderboard} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            City Explorer
          </h1>
          <p className="text-muted-foreground text-lg">
            Welcome {playerName}! Guess the city and discover amazing facts!
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" onClick={() => setShowLeaderboard(true)}>
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard
            </Button>
          </div>
        </div>

        {/* Game Stats */}
        <div className="flex justify-center">
          <GameStats score={score} totalGuesses={totalGuesses} currentRound={currentRound} />
        </div>

        {/* Game Area */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Where is this city?</span>
                <Button variant="outline" size="sm" onClick={resetGame}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Game
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CityMap city={currentCity} showAnswer={showAnswer} />
            </CardContent>
          </Card>

          {/* Guess Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Make Your Guess</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Round {currentRound}: Can you identify this city?
                  </p>
                  
                  <GuessInput
                    onGuess={checkGuess}
                    disabled={gameState !== 'guessing'}
                  />

                  {gameState !== 'guessing' && (
                    <Button onClick={nextRound} className="w-full">
                      Next City →
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Wikipedia Information */}
            <WikipediaInfo city={currentCity} show={showAnswer} />
          </div>
        </div>

        {/* Instructions */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold">How to Play</h3>
              <p className="text-sm text-muted-foreground">
                Look at the map position and try to guess the city name. 
                Once you guess correctly (or incorrectly), you'll see the city location 
                and learn interesting facts from Wikipedia!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CityGuessingGame;
