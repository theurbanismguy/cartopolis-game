
import React from 'react';
import { Target, Zap } from 'lucide-react';
import { Difficulty } from '../data/cities';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ difficulty, onDifficultyChange }) => {
  const getDifficultyIcon = (diff: Difficulty) => {
    switch (diff) {
      case 'easy':
        return <Target className="w-5 h-5" />;
      case 'hard':
        return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex gap-2">
      {(['easy', 'hard'] as Difficulty[]).map((diff) => {
        const icon = getDifficultyIcon(diff);
        return (
          <button
            key={diff}
            type="button"
            onClick={() => onDifficultyChange(diff)}
            className={`flex-1 p-3 md:p-4 border-2 md:border-4 border-black font-bold uppercase tracking-wider text-sm md:text-base transition-all duration-100 ${
              difficulty === diff
                ? 'bg-accent text-accent-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]'
                : 'bg-white hover:bg-muted shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {icon}
              <span className="font-black">{diff.toUpperCase()}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default DifficultySelector;
