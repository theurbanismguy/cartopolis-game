
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, RefreshCw, X, ToggleLeft, ToggleRight, Home, Globe, Satellite } from 'lucide-react';

interface FloatingControlsProps {
  onShowLeaderboard: () => void;
  onResetGame: () => void;
  onEndGame: () => void;
  onToggleMapView: () => void;
  onBackToMenu: () => void;
  mapView: 'satellite' | 'vector';
}

const FloatingControls: React.FC<FloatingControlsProps> = ({
  onShowLeaderboard,
  onResetGame,
  onEndGame,
  onToggleMapView,
  onBackToMenu,
  mapView
}) => {
  return (
    <div className="fixed top-6 left-6 z-50">
      <div className="neo-card bg-white/95 backdrop-blur-sm">
        <CardContent className="p-3">
          <div className="flex flex-col gap-2">
            <button
              onClick={onToggleMapView}
              className="neo-button-secondary text-sm px-3 py-2 flex items-center gap-2"
            >
              {mapView === 'satellite' ? <Satellite className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
              {mapView === 'satellite' ? 'SATELLITE' : 'VECTOR'}
            </button>
            
            <button
              onClick={onShowLeaderboard}
              className="neo-button-accent text-sm px-3 py-2 flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              LEADERBOARD
            </button>
            
            <button
              onClick={onResetGame}
              className="neo-button-secondary text-sm px-3 py-2 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              RESET
            </button>
            
            <button
              onClick={onBackToMenu}
              className="neo-button text-sm px-3 py-2 flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              MENU
            </button>
            
            <button
              onClick={onEndGame}
              className="neo-button text-sm px-3 py-2 flex items-center gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              <X className="w-4 h-4" />
              END GAME
            </button>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default FloatingControls;
