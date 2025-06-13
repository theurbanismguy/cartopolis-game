
import React from 'react';
import { City, Difficulty } from '../data/cities';
import CityMap from './CityMap';
import InteractiveCityInput from './InteractiveCityInput';
import SimpleFloatingControls from './SimpleFloatingControls';
import GameEnhancedStats from './GameEnhancedStats';
import TopBar from './TopBar';
import CompactWikipediaCard from './CompactWikipediaCard';
import FloatingActionButtons from './FloatingActionButtons';

interface GameScreenProps {
  currentCity: City;
  playerName: string;
  difficulty: Difficulty;
  score: number;
  totalGuesses: number;
  currentRound: number;
  currentStreak: number;
  bestStreak: number;
  gameState: 'guessing' | 'correct' | 'incorrect';
  showAnswer: boolean;
  showWikipedia: boolean;
  revealedLetters: Set<number>;
  hintsUsed: number;
  canUseHint: boolean;
  calculateAccuracy: () => number;
  onGuess: (guess: string) => void;
  onNextRound: () => void;
  onShowLeaderboard: () => void;
  onEndGame: () => void;
  onBackToMenu: () => void;
  onUseHint: () => void;
  onCloseWikipedia: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  currentCity,
  playerName,
  difficulty,
  score,
  totalGuesses,
  currentRound,
  currentStreak,
  bestStreak,
  gameState,
  showAnswer,
  showWikipedia,
  revealedLetters,
  hintsUsed,
  canUseHint,
  calculateAccuracy,
  onGuess,
  onNextRound,
  onShowLeaderboard,
  onEndGame,
  onBackToMenu,
  onUseHint,
  onCloseWikipedia
}) => {
  const currentAccuracy = calculateAccuracy();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full-screen map */}
      <CityMap city={currentCity} showAnswer={showAnswer} difficulty={difficulty} />
      
      {/* Mobile TopBar - only show on mobile */}
      <div className="md:hidden">
        <TopBar
          playerName={playerName}
          score={score}
          currentRound={currentRound}
          currentStreak={currentStreak}
          onShowLeaderboard={onShowLeaderboard}
          onEndGame={onEndGame}
          onBackToMenu={onBackToMenu}
          accuracy={currentAccuracy}
        />
      </div>

      {/* Desktop stats - hide on mobile */}
      <div className="hidden md:block">
        <GameEnhancedStats
          score={score}
          totalGuesses={totalGuesses}
          currentRound={currentRound}
          playerName={playerName}
          difficulty={difficulty}
          currentStreak={currentStreak}
          bestStreak={bestStreak}
        />
      </div>

      {/* Desktop controls - hide on mobile */}
      <div className="hidden md:block">
        <SimpleFloatingControls
          onShowLeaderboard={onShowLeaderboard}
          onEndGame={onEndGame}
          onBackToMenu={onBackToMenu}
          onUseHint={onUseHint}
          hintsUsed={hintsUsed}
          canUseHint={canUseHint}
          gameState={gameState}
        />
      </div>

      {/* Floating Action Buttons - visible on all screen sizes */}
      <FloatingActionButtons
        onUseHint={onUseHint}
        onEndGame={onEndGame}
        hintsUsed={hintsUsed}
        canUseHint={canUseHint}
        gameState={gameState}
      />

      {/* Interactive City Input */}
      <InteractiveCityInput
        cityName={currentCity.name}
        revealedLetters={revealedLetters}
        onGuess={onGuess}
        disabled={gameState !== 'guessing'}
        gameState={gameState}
        onNextRound={onNextRound}
        showAnswer={showAnswer}
      />

      {/* Compact Wikipedia Card */}
      {showWikipedia && currentCity && (
        <CompactWikipediaCard 
          city={currentCity} 
          show={showWikipedia} 
          onClose={onCloseWikipedia}
        />
      )}
    </div>
  );
};

export default GameScreen;
