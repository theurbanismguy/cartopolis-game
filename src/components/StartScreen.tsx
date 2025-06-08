import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Globe, Zap, Target, Satellite } from 'lucide-react';
import Leaderboard, { LeaderboardEntry } from './Leaderboard';
import { Difficulty } from '../data/cities';

interface StartScreenProps {
  onStartGame: (playerName: string, difficulty: Difficulty) => void;
  leaderboard: LeaderboardEntry[];
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, leaderboard }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  // Famous landmarks for the animated tour
  const landmarks = [
    { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
    { lat: 40.7128, lng: -74.0060, name: "New York" },
    { lat: 51.5074, lng: -0.1278, name: "London" },
    { lat: -33.8688, lng: 151.2093, name: "Sydney" },
    { lat: -22.9068, lng: -43.1729, name: "Rio de Janeiro" },
    { lat: 30.0444, lng: 31.2357, name: "Cairo" },
    { lat: 48.8566, lng: 2.3522, name: "Paris" },
    { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
    { lat: 55.7558, lng: 37.6176, name: "Moscow" },
    { lat: -34.6037, lng: -58.3816, name: "Buenos Aires" },
    { lat: 1.3521, lng: 103.8198, name: "Singapore" },
    { lat: 39.9042, lng: 116.4074, name: "Beijing" }
  ];

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Create map
    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 3,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
      attributionControl: false,
      keyboard: false,
      touchZoom: false,
      boxZoom: false
    });

    // Add satellite tile layer only
    const tileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
    });
    
    tileLayer.addTo(map);
    mapInstanceRef.current = map;

    // Animate through landmarks with smooth transitions
    let currentLandmarkIndex = 0;
    let animationTimeout: NodeJS.Timeout;

    const animateToNextLandmark = () => {
      if (!mapInstanceRef.current) return;
      
      const landmark = landmarks[currentLandmarkIndex];
      // Add some randomness to the zoom level and slight position offset
      const randomZoom = 4 + Math.random() * 4; // Zoom between 4-8
      const latOffset = (Math.random() - 0.5) * 0.5; // Small random offset
      const lngOffset = (Math.random() - 0.5) * 0.5;
      
      mapInstanceRef.current.flyTo([
        landmark.lat + latOffset, 
        landmark.lng + lngOffset
      ], randomZoom, {
        duration: 6, // Longer, smoother transitions
        easeLinearity: 0.05 // Smoother easing
      });
      
      currentLandmarkIndex = (currentLandmarkIndex + 1) % landmarks.length;
      
      // Schedule next animation with slight randomness
      const nextDelay = 6000 + Math.random() * 2000; // 6-8 seconds
      animationTimeout = setTimeout(animateToNextLandmark, nextDelay);
    };

    // Start animation after a brief delay
    animationTimeout = setTimeout(animateToNextLandmark, 1000);

    return () => {
      clearTimeout(animationTimeout);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onStartGame(playerName.trim(), difficulty);
    }
  };

  const getDifficultyInfo = (diff: Difficulty) => {
    switch (diff) {
      case 'easy':
        return { cities: '100+', population: '1M+', icon: <Target className="w-5 h-5" />, zoom: 'Full Control' };
      case 'medium':
        return { cities: '300+', population: '500K+', icon: <Globe className="w-5 h-5" />, zoom: 'Zoom In Only' };
      case 'hard':
        return { cities: '500+', population: '100K+', icon: <Zap className="w-5 h-5" />, zoom: 'Zoom In Only' };
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated background map - stays in background */}
      <div 
        ref={mapRef} 
        className="absolute inset-0 w-full h-full"
        style={{ 
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      {/* Dark overlay for better content readability */}
      <div 
        className="absolute inset-0 bg-black/60"
        style={{ zIndex: 1 }}
      />
      
      {/* Content overlay - mobile-first design */}
      <div 
        className="relative h-full flex flex-col"
        style={{ zIndex: 10 }}
      >
        {/* Main Content - Mobile Optimized */}
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="max-w-6xl w-full">
            
            {/* Mobile Layout: Single Column */}
            <div className="lg:hidden space-y-4">
              {/* Compact Title */}
              <div className="text-center mb-6">
                <h1 className="text-5xl sm:text-6xl font-black neo-text-shadow text-white tracking-wider">
                  CARTOPOLIS
                </h1>
                <p className="text-base font-bold text-white mt-2 neo-text-shadow">
                  MASTER THE WORLD FROM SATELLITE VIEW
                </p>
              </div>

              {/* Game Setup Form - Above Fold */}
              <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-4">
                  <h2 className="text-lg font-black uppercase tracking-wider text-center mb-4">
                    START EXPLORING
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                        Explorer Name
                      </label>
                      <input
                        type="text"
                        placeholder="ENTER YOUR NAME..."
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="w-full border-2 border-black bg-white px-3 py-2 font-bold text-base"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                        Difficulty Level
                      </label>
                      <div className="space-y-2">
                        {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => {
                          const info = getDifficultyInfo(diff);
                          return (
                            <button
                              key={diff}
                              type="button"
                              onClick={() => setDifficulty(diff)}
                              className={`w-full p-3 border-2 border-black font-bold uppercase tracking-wider text-sm transition-all ${
                                difficulty === diff
                                  ? 'bg-accent text-accent-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                  : 'bg-white hover:bg-muted shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {info.icon}
                                  <span className="font-black">{diff.toUpperCase()}</span>
                                </div>
                                <div className="text-right text-xs">
                                  <div>{info.cities}</div>
                                  <div className="text-muted-foreground">{info.population}</div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!playerName.trim()}
                      className="w-full bg-primary text-primary-foreground border-2 border-black font-bold uppercase tracking-wider py-4 text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      START EXPLORING
                    </button>
                  </form>
                </div>
              </div>

              {/* Compact Leaderboard - Optional on Mobile */}
              {leaderboard.length > 0 && (
                <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="p-3 border-b-2 border-black">
                    <h3 className="text-base font-black uppercase tracking-wider flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-accent" />
                      TOP EXPLORERS
                    </h3>
                  </div>
                  <div className="p-3 max-h-40 overflow-y-auto">
                    <div className="space-y-2">
                      {leaderboard.slice(0, 5).map((entry, index) => (
                        <div
                          key={`${entry.name}-${index}`}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 border border-black flex items-center justify-center font-black text-xs ${
                              index === 0 ? 'bg-yellow-400' : 
                              index === 1 ? 'bg-gray-300' : 
                              index === 2 ? 'bg-amber-600' : 'bg-white'
                            }`}>
                              {index + 1}
                            </div>
                            <div className="font-bold uppercase truncate max-w-[120px]">
                              {entry.name}
                            </div>
                          </div>
                          <div className="font-black">{entry.score}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Layout: Two Columns */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-start">
              {/* Game Setup */}
              <div className="space-y-6">
                {/* Title */}
                <div className="text-center lg:text-left">
                  <h1 className="text-8xl font-black neo-text-shadow text-white mb-4 tracking-wider">
                    CARTOPOLIS
                  </h1>
                  <p className="text-xl font-bold text-white mt-4 neo-text-shadow">
                    MASTER THE WORLD FROM SATELLITE VIEW
                  </p>
                </div>

                {/* Game Setup Form */}
                <div className="neo-card bg-white/95 backdrop-blur-sm">
                  <div className="p-4 border-b-4 border-black">
                    <h2 className="text-2xl font-black uppercase tracking-wider">
                      START EXPLORING
                    </h2>
                  </div>
                  <div className="p-6 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                          Explorer Name
                        </label>
                        <input
                          type="text"
                          placeholder="ENTER YOUR NAME..."
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          className="neo-input text-lg py-3 w-full"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-3">
                          Difficulty Level
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => {
                            const info = getDifficultyInfo(diff);
                            return (
                              <button
                                key={diff}
                                type="button"
                                onClick={() => setDifficulty(diff)}
                                className={`p-4 border-4 border-black font-bold uppercase tracking-wider transition-all duration-100 text-base ${
                                  difficulty === diff
                                    ? 'bg-accent text-accent-foreground shadow-neo translate-x-[2px] translate-y-[2px]'
                                    : 'bg-card hover:bg-muted shadow-neo-lg hover:shadow-neo hover:translate-x-[2px] hover:translate-y-[2px]'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    {info.icon}
                                    <span className="font-black">{diff.toUpperCase()}</span>
                                  </div>
                                  <div className="text-right text-sm">
                                    <div>{info.cities} Cities</div>
                                    <div className="text-muted-foreground">{info.population} Pop</div>
                                    <div className="text-muted-foreground">{info.zoom}</div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!playerName.trim()}
                        className="w-full neo-button text-lg py-6"
                      >
                        START EXPLORING
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Leaderboard */}
              <div className="space-y-6">
                <div className="neo-card bg-white/95 backdrop-blur-sm">
                  <div className="p-4 border-b-4 border-black">
                    <h2 className="text-2xl font-black uppercase tracking-wider flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-accent" />
                      HALL OF FAME
                    </h2>
                  </div>
                  <div className="p-4 max-h-96 overflow-y-auto">
                    {leaderboard.length === 0 ? (
                      <p className="text-center text-muted-foreground font-bold uppercase tracking-wider py-8 text-base">
                        NO EXPLORERS YET!
                        <br />
                        BE THE FIRST!
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {leaderboard.slice(0, 8).map((entry, index) => (
                          <div
                            key={`${entry.name}-${index}`}
                            className={`flex items-center justify-between p-3 border-2 border-black text-base ${
                              index < 3 ? 'bg-secondary/20' : 'bg-muted/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 border-2 border-black flex items-center justify-center font-black text-sm ${
                                index === 0 ? 'bg-yellow-400' : 
                                index === 1 ? 'bg-gray-300' : 
                                index === 2 ? 'bg-amber-600' : 'bg-white'
                              }`}>
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-bold uppercase">{entry.name}</div>
                                <div className="text-sm text-muted-foreground uppercase">
                                  {entry.gamesPlayed} Games • {entry.streak || 0} Streak
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-black text-lg">{entry.score}</div>
                              <div className="text-sm text-muted-foreground">{entry.accuracy}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
