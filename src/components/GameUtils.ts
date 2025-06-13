
import { LeaderboardEntry } from './Leaderboard';

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
