
import React, { useEffect, useRef } from 'react';
import { City } from '../data/cities';

interface CityMapProps {
  city: City;
  showAnswer: boolean;
}

const CityMap: React.FC<CityMapProps> = ({ city, showAnswer }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Simple map implementation using a world map image
    const mapElement = mapRef.current;
    mapElement.innerHTML = '';

    // Create a simple coordinate system for positioning
    const mapWidth = 800;
    const mapHeight = 400;
    
    // Convert lat/lng to pixel coordinates
    const x = ((city.lng + 180) / 360) * mapWidth;
    const y = ((90 - city.lat) / 180) * mapHeight;

    // Create map container
    const mapContainer = document.createElement('div');
    mapContainer.className = 'relative w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg overflow-hidden';
    mapContainer.style.backgroundImage = `
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1), transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2), transparent 50%)
    `;

    // Add some visual elements to make it look like a stylized world map
    for (let i = 0; i < 20; i++) {
      const landmass = document.createElement('div');
      landmass.className = 'absolute bg-green-500 opacity-60 rounded-full';
      landmass.style.width = `${Math.random() * 60 + 20}px`;
      landmass.style.height = `${Math.random() * 40 + 15}px`;
      landmass.style.left = `${Math.random() * 90}%`;
      landmass.style.top = `${Math.random() * 90}%`;
      landmass.style.transform = `rotate(${Math.random() * 360}deg)`;
      mapContainer.appendChild(landmass);
    }

    // Add the city marker if answer should be shown
    if (showAnswer) {
      const marker = document.createElement('div');
      marker.className = 'absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse z-10';
      marker.style.left = `${(x / mapWidth) * 100}%`;
      marker.style.top = `${(y / mapHeight) * 100}%`;
      marker.style.transform = 'translate(-50%, -50%)';
      
      // Add marker label
      const label = document.createElement('div');
      label.className = 'absolute bg-white px-2 py-1 rounded shadow-lg text-sm font-semibold text-gray-800 whitespace-nowrap';
      label.style.left = '20px';
      label.style.top = '-10px';
      label.textContent = `${city.name}, ${city.country}`;
      marker.appendChild(label);
      
      mapContainer.appendChild(marker);
    }

    mapElement.appendChild(mapContainer);
  }, [city, showAnswer]);

  return (
    <div className="w-full h-96 rounded-lg shadow-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default CityMap;
