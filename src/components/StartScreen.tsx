
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Globe, Zap, Target, Settings } from 'lucide-react';
import Leaderboard, { LeaderboardEntry } from './Leaderboard';
import { Difficulty } from '../data/cities';

interface StartScreenProps {
  onStartGame: (playerName: string, difficulty: Difficulty, mapView: 'satellite' | 'vector') => void;
  leaderboard: LeaderboardEntry[];
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, leaderboard }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [mapView, setMapView] = useState<'satellite' | 'vector'>('satellite');

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
      touchZoom: false
    });

    // Add tile layer based on selected view
    const tileLayer = mapView === 'satellite' 
      ? L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 18,
        })
      : L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: ''
        });
    
    tileLayer.addTo(map);
    mapInstanceRef.current = map;

    // Animate through landmarks
    let currentLandmarkIndex = 0;
    const animateToNextLandmark = () => {
      if (!mapInstanceRef.current) return;
      
      const landmark = landmarks[currentLandmarkIndex];
      const randomZoom = 4 + Math.random() * 3; // Zoom between 4-7
      
      mapInstanceRef.current.flyTo([landmark.lat, landmark.lng], randomZoom, {
        duration: 4,
        easeLinearity: 0.1
      });
      
      currentLandmarkIndex = (currentLandmarkIndex + 1) % landmarks.length;
    };

    // Start animation immediately
    animateToNextLandmark();
    
    // Continue animation every 5 seconds
    const interval = setInterval(animateToNextLandmark, 5000);

    return () => {
      clearInterval(interval);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onStartGame(playerName.trim(), difficulty, mapView);
    }
  };

  const getDifficultyInfo = (diff: Difficulty) => {
    switch (diff) {
      case 'easy':
        return { cities: '100+', population: '1M+', icon: <Target className="w-5 h-5" /> };
      case 'medium':
        return { cities: '300+', population: '500K+', icon: <Globe className="w-5 h-5" /> };
      case 'hard':
        return { cities: '500+', population: '100K+', icon: <Zap className="w-5 h-5" /> };
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated background map */}
      <div ref={mapRef} className="absolute inset-0 w-full h-full" />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Game Setup */}
            <div className="space-y-6">
              {/* Title */}
              <div className="text-center lg:text-left">
                <h1 className="text-6xl lg:text-8xl font-black neo-text-shadow text-white mb-4 neo-gradient-bg bg-clip-text">
                  CITY
                </h1>
                <h1 className="text-6xl lg:text-8xl font-black neo-text-shadow text-white -mt-6 neo-gradient-bg bg-clip-text">
                  EXPLORER
                </h1>
                <p className="text-xl font-bold text-white mt-4 neo-text-shadow">
                  GUESS THE CITY FROM SATELLITE VIEW
                </p>
              </div>

              {/* Game Setup Form */}
              <Card className="neo-card bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-black uppercase tracking-wider">
                    START GAME
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                        Player Name
                      </label>
                      <Input
                        type="text"
                        placeholder="ENTER YOUR NAME..."
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="neo-input"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider mb-3">
                        Difficulty
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => {
                          const info = getDifficultyInfo(diff);
                          return (
                            <button
                              key={diff}
                              type="button"
                              onClick={() => setDifficulty(diff)}
                              className={`p-4 border-4 border-black font-bold uppercase tracking-wider transition-all duration-100 ${
                                difficulty === diff
                                  ? 'bg-accent text-accent-foreground shadow-neo translate-x-[2px] translate-y-[2px]'
                                  : 'bg-card hover:bg-muted shadow-neo-lg hover:shadow-neo hover:translate-x-[2px] hover:translate-y-[2px]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {info.icon}
                                  <span>{diff}</span>
                                </div>
                                <div className="text-right text-sm">
                                  <div>{info.cities} Cities</div>
                                  <div className="text-muted-foreground">{info.population} Population</div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider mb-3">
                        Map View
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setMapView('satellite')}
                          className={`p-3 border-4 border-black font-bold uppercase tracking-wider transition-all duration-100 ${
                            mapView === 'satellite'
                              ? 'bg-secondary text-secondary-foreground shadow-neo translate-x-[2px] translate-y-[2px]'
                              : 'bg-card hover:bg-muted shadow-neo-lg hover:shadow-neo hover:translate-x-[2px] hover:translate-y-[2px]'
                          }`}
                        >
                          <Globe className="w-5 h-5 mx-auto mb-1" />
                          Satellite
                        </button>
                        <button
                          type="button"
                          onClick={() => setMapView('vector')}
                          className={`p-3 border-4 border-black font-bold uppercase tracking-wider transition-all duration-100 ${
                            mapView === 'vector'
                              ? 'bg-secondary text-secondary-foreground shadow-neo translate-x-[2px] translate-y-[2px]'
                              : 'bg-card hover:bg-muted shadow-neo-lg hover:shadow-neo hover:translate-x-[2px] hover:translate-y-[2px]'
                          }`}
                        >
                          <Settings className="w-5 h-5 mx-auto mb-1" />
                          Vector
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={!playerName.trim()}
                      className="w-full neo-button text-lg py-6"
                    >
                      START EXPLORING
                    </Button>
                  </form>
                </CardContent>
              </Card>
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
                    <p className="text-center text-muted-foreground font-bold uppercase tracking-wider py-8">
                      NO EXPLORERS YET!
                      <br />
                      BE THE FIRST!
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {leaderboard.slice(0, 8).map((entry, index) => (
                        <div
                          key={`${entry.name}-${index}`}
                          className={`flex items-center justify-between p-3 border-2 border-black ${
                            index < 3 ? 'bg-secondary/20' : 'bg-muted/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 border-2 border-black flex items-center justify-center font-black ${
                              index === 0 ? 'bg-yellow-400' : 
                              index === 1 ? 'bg-gray-300' : 
                              index === 2 ? 'bg-amber-600' : 'bg-white'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-bold uppercase">{entry.name}</div>
                              <div className="text-sm text-muted-foreground uppercase">
                                {entry.gamesPlayed} Games
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
  );
};

export default StartScreen;
