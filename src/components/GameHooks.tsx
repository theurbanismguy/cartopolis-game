
import { useState } from 'react';
import { Difficulty } from '../data/cities';

export const useGameState = () => {
  const [score, setScore] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [roundStartTime, setRoundStartTime] = useState<number>(0);
  const [totalTimeBonus, setTotalTimeBonus] = useState(0);

  const resetGame = () => {
    setScore(0);
    setTotalGuesses(0);
    setCorrectGuesses(0);
    setCurrentRound(1);
    setCurrentStreak(0);
    setBestStreak(0);
    setTotalTimeBonus(0);
    setRoundStartTime(Date.now());
  };

  const nextRound = () => {
    setCurrentRound(prev => prev + 1);
    setRoundStartTime(Date.now());
  };

  const calculateTimeBonus = (startTime: number, difficulty: Difficulty): number => {
    const timeTaken = (Date.now() - startTime) / 1000;
    const baseTime = difficulty === 'easy' ? 60 : 30;
    
    if (timeTaken <= baseTime) {
      return Math.max(0, Math.floor((baseTime - timeTaken) / 15)); // Reduced time bonus scaling
    }
    return 0;
  };

  const calculateAccuracy = (): number => {
    if (totalGuesses === 0) return 0;
    return Math.min(100, Math.round((correctGuesses / totalGuesses) * 100));
  };

  return {
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
    totalTimeBonus,
    setTotalTimeBonus,
    resetGame,
    nextRound,
    calculateTimeBonus,
    calculateAccuracy
  };
};
