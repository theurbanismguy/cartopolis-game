
import { LeaderboardEntry } from './Leaderboard';

export const shouldResetLeaderboard = (lastResetTime: string | null): boolean => {
  if (!lastResetTime) return true;
  
  const now = new Date();
  const lastReset = new Date(lastResetTime);
  const today12PM = new Date();
  today12PM.setHours(11, 0, 0, 0); // 12 PM CET = 11 AM UTC
  
  // If it's past 12 PM today and last reset was before today 12 PM
  return now >= today12PM && lastReset < today12PM;
};

export const sortLeaderboard = (entries: LeaderboardEntry[]): LeaderboardEntry[] => {
  return entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (b.streak || 0) - (a.streak || 0);
  });
};

export const updatePlayerInLeaderboard = (
  leaderboard: LeaderboardEntry[],
  playerName: string,
  newEntry: LeaderboardEntry
): LeaderboardEntry[] => {
  const existingPlayerIndex = leaderboard.findIndex(entry => entry.name === playerName);
  
  if (existingPlayerIndex >= 0) {
    const updatedLeaderboard = [...leaderboard];
    const existingEntry = updatedLeaderboard[existingPlayerIndex];
    updatedLeaderboard[existingPlayerIndex] = {
      ...existingEntry,
      score: Math.max(existingEntry.score, newEntry.score),
      accuracy: Math.max(existingEntry.accuracy, newEntry.accuracy),
      gamesPlayed: existingEntry.gamesPlayed + newEntry.gamesPlayed,
      streak: Math.max(existingEntry.streak || 0, newEntry.streak || 0),
      difficulty: newEntry.difficulty
    };
    return sortLeaderboard(updatedLeaderboard);
  } else {
    return sortLeaderboard([...leaderboard, newEntry]);
  }
};
