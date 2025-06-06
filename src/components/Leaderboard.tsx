
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award } from 'lucide-react';

export interface LeaderboardEntry {
  name: string;
  score: number;
  accuracy: number;
  gamesPlayed: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  const sortedEntries = [...entries].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.accuracy - a.accuracy;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedEntries.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No players yet!</p>
        ) : (
          <div className="space-y-2">
            {sortedEntries.slice(0, 10).map((entry, index) => (
              <div
                key={`${entry.name}-${index}`}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  index < 3 ? 'bg-gradient-to-r from-primary/10 to-secondary/10' : 'bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {getIcon(index)}
                  <div>
                    <div className="font-semibold">{entry.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {entry.gamesPlayed} games played
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{entry.score}</div>
                  <div className="text-sm text-muted-foreground">{entry.accuracy}% accuracy</div>
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
