
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from '../data/cities';
import { Difficulty } from '../data/cities';

interface CityMapProps {
  city: City;
  showAnswer: boolean;
  difficulty: Difficulty;
}

const CityMap: React.FC<CityMapProps> = ({ city, showAnswer, difficulty }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Get initial zoom based on difficulty
    const getInitialZoom = (diff: Difficulty) => {
      switch (diff) {
        case 'easy': return 13;
        case 'medium': return 12;
        case 'hard': return 11;
        default: return 12;
      }
    };

    const initialZoom = getInitialZoom(difficulty);

    // Create map centered on the city with appropriate zoom level
    const map = L.map(mapRef.current, {
      center: [city.lat, city.lng],
      zoom: initialZoom,
      zoomControl: false,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      dragging: true,
      attributionControl: false
    });

    // Add satellite tile layer only
    const tileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
    });
    
    tileLayer.addTo(map);
    tileLayerRef.current = tileLayer;
    mapInstanceRef.current = map;

    // Set zoom restrictions based on difficulty
    if (difficulty === 'medium' || difficulty === 'hard') {
      // For medium and hard, prevent zooming out below initial level
      map.setMinZoom(initialZoom);
      
      // Add custom zoom control with restricted functionality
      const customZoomControl = L.Control.extend({
        onAdd: function(map: L.Map) {
          const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
          
          // Zoom in button
          const zoomInButton = L.DomUtil.create('a', 'leaflet-control-zoom-in', container);
          zoomInButton.innerHTML = '+';
          zoomInButton.href = '#';
          zoomInButton.title = 'Zoom in';
          
          L.DomEvent.on(zoomInButton, 'click', function(e) {
            L.DomEvent.preventDefault(e);
            map.zoomIn();
          });
          
          // Zoom out button (disabled for medium/hard)
          const zoomOutButton = L.DomUtil.create('a', 'leaflet-control-zoom-out leaflet-control-zoom-disabled', container);
          zoomOutButton.innerHTML = '−';
          zoomOutButton.href = '#';
          zoomOutButton.title = 'Zoom out (disabled)';
          zoomOutButton.style.opacity = '0.5';
          zoomOutButton.style.cursor = 'not-allowed';
          
          return container;
        }
      });
      
      new customZoomControl({ position: 'topleft' }).addTo(map);
    } else {
      // For easy mode, add normal zoom controls
      L.control.zoom({ position: 'topleft' }).addTo(map);
    }

    // Add marker when answer should be shown
    if (showAnswer) {
      // Custom neobrutalist marker
      const neoIcon = L.divIcon({
        className: 'neo-marker',
        html: `
          <div class="relative">
            <div class="w-8 h-8 bg-accent border-4 border-black shadow-neo animate-neo-bounce"></div>
            <div class="absolute -top-2 -left-2 w-12 h-12 border-4 border-accent animate-ping"></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([city.lat, city.lng], { icon: neoIcon }).addTo(map);
      
      // Add neobrutalist popup
      marker.bindPopup(`
        <div class="neo-card bg-white p-3 min-w-[200px]">
          <div class="text-lg font-black uppercase text-center border-b-2 border-black pb-2 mb-2">
            ${city.name}
          </div>
          <div class="text-sm font-bold text-center text-muted-foreground">
            ${city.country}
          </div>
          <div class="text-xs text-center text-muted-foreground mt-1">
            ${city.population.toLocaleString()} people
          </div>
          <div class="text-xs text-center text-muted-foreground">
            ${city.continent}
          </div>
        </div>
      `, {
        className: 'neo-popup'
      }).openPopup();

      markerRef.current = marker;
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [city, showAnswer, difficulty]);

  return (
    <div className="fixed inset-0 w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      <style dangerouslySetInnerHTML={{
        __html: `
          .neo-marker {
            background: transparent !important;
            border: none !important;
          }
          .neo-popup .leaflet-popup-content-wrapper {
            background: white !important;
            border: 4px solid black !important;
            border-radius: 0 !important;
            box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1) !important;
            padding: 0 !important;
          }
          .neo-popup .leaflet-popup-tip {
            background: white !important;
            border: 2px solid black !important;
            border-top: none !important;
            border-right: none !important;
            box-shadow: -2px 2px 0px 0px rgba(0, 0, 0, 1) !important;
          }
          .neo-popup .leaflet-popup-close-button {
            background: black !important;
            color: white !important;
            font-weight: bold !important;
            border: none !important;
            width: 24px !important;
            height: 24px !important;
            font-size: 16px !important;
            line-height: 20px !important;
          }
          .leaflet-control-zoom-disabled {
            pointer-events: none !important;
          }
          @keyframes neo-bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translate3d(0,0,0);
            }
            40%, 43% {
              transform: translate3d(0,-8px,0);
            }
            70% {
              transform: translate3d(0,-4px,0);
            }
            90% {
              transform: translate3d(0,-2px,0);
            }
          }
          .animate-neo-bounce {
            animation: neo-bounce 2s ease-in-out infinite;
          }
        `
      }} />
    </div>
  );
};

export default CityMap;
