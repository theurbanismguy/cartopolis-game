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
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [mapOpacity, setMapOpacity] = useState(1);

  // Curated list of visually interesting cities for backgrounds
  const backgroundCities = [
    { lat: 40.7128, lng: -74.0060, name: "New York" }, // Manhattan island
    { lat: -22.9068, lng: -43.1729, name: "Rio de Janeiro" }, // Christ the Redeemer area
    { lat: 48.8566, lng: 2.3522, name: "Paris" }, // Seine River curves
    { lat: 35.6762, lng: 139.6503, name: "Tokyo" }, // Tokyo Bay
    { lat: 51.5074, lng: -0.1278, name: "London" }, // Thames River
    { lat: -33.8688, lng: 151.2093, name: "Sydney" }, // Harbor and Opera House
    { lat: 37.7749, lng: -122.4194, name: "San Francisco" }, // Bay and Golden Gate
    { lat: 55.7558, lng: 37.6176, name: "Moscow" }, // Red Square area
    { lat: 30.0444, lng: 31.2357, name: "Cairo" }, // Nile River
    { lat: 1.3521, lng: 103.8198, name: "Singapore" }, // Island nation
    { lat: 25.2048, lng: 55.2708, name: "Dubai" }, // Palm Jumeirah
    { lat: -34.6037, lng: -58.3816, name: "Buenos Aires" } // Rio de la Plata
  ];

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Create map with static initial city
    const initialCity = backgroundCities[Math.floor(Math.random() * backgroundCities.length)];
    
    const map = L.map(mapRef.current, {
      center: [initialCity.lat, initialCity.lng],
      zoom: 12,
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

    // Function to switch to a random city with fade transition
    const switchToRandomCity = () => {
      if (!mapInstanceRef.current) return;
      
      // Start fade out
      setMapOpacity(0.3);
      
      setTimeout(() => {
        if (!mapInstanceRef.current) return;
        
        // Pick a random city different from current
        const randomCity = backgroundCities[Math.floor(Math.random() * backgroundCities.length)];
        
        // Set new view instantly (no animation)
        mapInstanceRef.current.setView([randomCity.lat, randomCity.lng], 12);
        
        // Fade back in
        setMapOpacity(1);
      }, 800); // Wait for fade out to complete
    };

    // Switch cities every 12 seconds
    const switchInterval = setInterval(switchToRandomCity, 12000);

    return () => {
      clearInterval(switchInterval);
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
    <div className="relative w-full h-screen overflow-hidden">
      {/* Static background map with fade transitions */}
      <div 
        ref={mapRef} 
        className="absolute inset-0 w-full h-full transition-opacity duration-800 ease-in-out"
        style={{ 
          zIndex: 0,
          pointerEvents: 'none',
          opacity: mapOpacity,
          filter: 'blur(1px)'
        }}
      />
      
      {/* Darker overlay for better content readability */}
      <div 
        className="absolute inset-0 bg-black/75"
        style={{ zIndex: 1 }}
      />
      
      {/* Content overlay - single column layout */}
      <div 
        className="relative h-full flex flex-col"
        style={{ zIndex: 10 }}
      >
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="max-w-2xl w-full space-y-8">
            
            {/* Title */}
            <div className="text-center">
              <h1 className="text-5xl md:text-8xl font-black neo-text-shadow text-white tracking-wider">
                CARTOPOLIS
              </h1>
              <p className="text-base md:text-xl font-bold text-white mt-2 md:mt-4 neo-text-shadow">
                MASTER THE WORLD FROM SATELLITE VIEW
              </p>
            </div>

            {/* Game Setup Form */}
            <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="p-4 border-b-2 border-black">
                <h2 className="text-lg md:text-2xl font-black uppercase tracking-wider text-center">
                  START EXPLORING
                </h2>
              </div>
              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
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
                      className="w-full border-2 border-black bg-white px-3 py-2 md:py-3 font-bold text-base md:text-lg"
                      required
                    />
                  </div>

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
                            onClick={() => setDifficulty(diff)}
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

                  <button
                    type="submit"
                    disabled={!playerName.trim()}
                    className="w-full bg-primary text-primary-foreground border-2 border-black font-bold uppercase tracking-wider py-4 md:py-6 text-base md:text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    START EXPLORING
                  </button>
                </form>
              </div>
            </div>

            {/* Hall of Fame - Below the fold */}
            {leaderboard.length > 0 && (
              <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-3 md:p-4 border-b-2 border-black">
                  <h3 className="text-base md:text-2xl font-black uppercase tracking-wider flex items-center gap-2">
                    <Trophy className="w-4 h-4 md:w-6 md:h-6 text-accent" />
                    HALL OF FAME
                  </h3>
                </div>
                <div className="p-3 md:p-4 max-h-60 md:max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    {leaderboard.slice(0, 8).map((entry, index) => (
                      <div
                        key={`${entry.name}-${index}`}
                        className={`flex items-center justify-between p-2 md:p-3 border-2 border-black text-sm md:text-base ${
                          index < 3 ? 'bg-secondary/20' : 'bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className={`w-6 h-6 md:w-8 md:h-8 border border-black md:border-2 flex items-center justify-center font-black text-xs md:text-sm ${
                            index === 0 ? 'bg-yellow-400' : 
                            index === 1 ? 'bg-gray-300' : 
                            index === 2 ? 'bg-amber-600' : 'bg-white'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-bold uppercase truncate max-w-[120px] md:max-w-none">
                              {entry.name}
                            </div>
                            <div className="text-xs md:text-sm text-muted-foreground uppercase">
                              {entry.gamesPlayed} Games • {entry.streak || 0} Streak
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-base md:text-lg">{entry.score}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">{entry.accuracy}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
