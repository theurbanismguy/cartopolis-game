
import React from 'react';
import { Target, Zap } from 'lucide-react';
import { Difficulty } from '../data/cities';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ difficulty, onDifficultyChange }) => {
  const getDifficultyInfo = (diff: Difficulty) => {
    switch (diff) {
      case 'easy':
        return { 
          cities: '100+', 
          population: '1M+', 
          icon: <Target className="w-5 h-5" />, 
          zoom: 'Full Control',
          description: 'Zoom in/out and pan around'
        };
      case 'hard':
        return { 
          cities: '500+', 
          population: '100K+', 
          icon: <Zap className="w-5 h-5" />, 
          zoom: 'Zoom In Only',
          description: 'No panning, zoom in only'
        };
    }
  };

  return (
    <div>
      <label className="block text-sm font-bold uppercase tracking-wider mb-2 md:mb-3">
        Difficulty Level
      </label>
      <div className="space-y-2 md:space-y-3">
        {(['easy', 'hard'] as Difficulty[]).map((diff) => {
          const info = getDifficultyInfo(diff);
          return (
            <button
              key={diff}
              type="button"
              onClick={() => onDifficultyChange(diff)}
              className={`w-full p-3 md:p-4 border-2 md:border-4 border-black font-bold uppercase tracking-wider text-sm md:text-base transition-all duration-100 ${
                difficulty === diff
                  ? 'bg-accent text-accent-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]'
                  : 'bg-white hover:bg-muted shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  {info.icon}
                  <span className="font-black">{diff.toUpperCase()}</span>
                </div>
                <div className="text-right text-xs md:text-sm">
                  <div>{info.cities}</div>
                  <div className="text-muted-foreground">{info.population}</div>
                </div>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2 text-left">
                {info.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultySelector;
