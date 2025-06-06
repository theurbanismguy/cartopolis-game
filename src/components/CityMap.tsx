
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
      zoom: 11, // City-level zoom
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      dragging: true
    });

    // Add OpenStreetMap tile layer without labels
    // Using a tile server that provides maps without text labels
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Add marker when answer should be shown
    if (showAnswer) {
      // Custom red marker icon
      const redIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker([city.lat, city.lng], { icon: redIcon }).addTo(map);
      
      // Add popup with city information
      marker.bindPopup(`
        <div class="text-center font-semibold">
          <div class="text-lg">${city.name}</div>
          <div class="text-sm text-gray-600">${city.country}</div>
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
    <div className="w-full h-96 rounded-lg shadow-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-marker {
            background: transparent !important;
            border: none !important;
          }
        `
      }} />
    </div>
  );
};

export default CityMap;
