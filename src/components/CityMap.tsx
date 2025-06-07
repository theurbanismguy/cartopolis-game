
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from '../data/cities';

interface CityMapProps {
  city: City;
  showAnswer: boolean;
}

const CityMap: React.FC<CityMapProps> = ({ city, showAnswer }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Create map centered on the city with appropriate zoom level
    const map = L.map(mapRef.current, {
      center: [city.lat, city.lng],
      zoom: 11,
      zoomControl: false, // We'll add custom controls later
      scrollWheelZoom: true,
      doubleClickZoom: true,
      dragging: true,
      attributionControl: false // Hide attribution for cleaner look
    });

    // Add ESRI World Imagery (satellite) tile layer - no labels
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Add marker when answer should be shown
    if (showAnswer) {
      // Custom red marker icon
      const redIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([city.lat, city.lng], { icon: redIcon }).addTo(map);
      
      // Add popup with city information
      marker.bindPopup(`
        <div class="text-center font-semibold bg-white/90 backdrop-blur-sm rounded-lg p-2">
          <div class="text-lg font-bold text-gray-800">${city.name}</div>
          <div class="text-sm text-gray-600">${city.country}</div>
          <div class="text-xs text-gray-500">${city.population.toLocaleString()} people</div>
        </div>
      `).openPopup();

      markerRef.current = marker;
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [city, showAnswer]);

  return (
    <div className="fixed inset-0 w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-marker {
            background: transparent !important;
            border: none !important;
          }
          .leaflet-popup-content-wrapper {
            border-radius: 8px !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
          }
        `
      }} />
    </div>
  );
};

export default CityMap;
