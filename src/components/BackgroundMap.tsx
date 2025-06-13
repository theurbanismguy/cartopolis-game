
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const BackgroundMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
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

  return (
    <>
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
    </>
  );
};

export default BackgroundMap;
