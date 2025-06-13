
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award, Flame, Clock } from 'lucide-react';
import { Difficulty } from '../data/cities';

export interface LeaderboardEntry {
  name: string;
  score: number;
  accuracy: number;
  gamesPlayed: number;
  streak?: number;
  timeBonus?: number;
  difficulty: Difficulty;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  const sortedEntries = [...entries].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (b.streak || 0) - (a.streak || 0);
  });

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">{index + 1}</span>;
    }
  };

  const getBadgeColor = (index: number) => {
    switch (index) {
      case 0: return 'bg-yellow-400 text-black';
      case 1: return 'bg-gray-300 text-black';
      case 2: return 'bg-amber-600 text-white';
      default: return 'bg-white text-black';
    }
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    return difficulty === 'easy' ? 'text-green-600' : 'text-red-600';
  };

  const getDifficultyLabel = (difficulty: Difficulty) => {
    return difficulty.toUpperCase();
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="neo-card">
      <CardHeader className="border-b-4 border-black">
        <CardTitle className="text-2xl font-black uppercase tracking-wider flex items-center gap-2">
          <Trophy className="w-6 h-6 text-accent" />
          TODAY'S LEADERBOARD
        </CardTitle>
        <p className="text-sm text-muted-foreground font-bold uppercase">
          {today} • Resets daily at 12 PM CET
        </p>
      </CardHeader>
      <CardContent className="p-0">
        {sortedEntries.length === 0 ? (
          <p className="text-center text-muted-foreground font-bold uppercase tracking-wider py-8 text-lg">
            NO EXPLORERS YET!
            <br />
            BE THE FIRST TO CONQUER THE WORLD!
          </p>
        ) : (
          <div className="space-y-0">
            {sortedEntries.slice(0, 10).map((entry, index) => (
              <div
                key={`${entry.name}-${index}`}
                className={`flex items-center justify-between p-4 border-b-2 border-black last:border-b-0 ${
                  index < 3 ? 'bg-gradient-to-r from-secondary/20 to-accent/20' : 'bg-muted/30'
                } ${index === 0 ? 'border-4 border-accent' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 border-4 border-black flex items-center justify-center font-black text-lg ${getBadgeColor(index)}`}>
                    {index < 3 ? getIcon(index) : index + 1}
                  </div>
                  <div>
                    <div className="font-black uppercase text-lg">{entry.name}</div>
                    <div className="text-sm text-muted-foreground uppercase font-bold flex items-center gap-3">
                      <span className={getDifficultyColor(entry.difficulty)}>
                        {getDifficultyLabel(entry.difficulty)} MODE
                      </span>
                      <span>•</span>
                      <span>{entry.gamesPlayed} Games</span>
                      {(entry.streak && entry.streak > 0) && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-orange-500">
                            <Flame className="w-3 h-3" />
                            {entry.streak} Streak
                          </span>
                        </>
                      )}
                      {(entry.timeBonus && entry.timeBonus > 0) && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-blue-500">
                            <Clock className="w-3 h-3" />
                            +{entry.timeBonus}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-2xl text-primary">{entry.score}</div>
                  <div className="text-sm text-muted-foreground font-bold">{entry.accuracy}% ACC</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
