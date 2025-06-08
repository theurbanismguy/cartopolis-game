
import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Users, Globe } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { City } from '../data/cities';

interface CompactWikipediaCardProps {
  city: City;
  show: boolean;
  onClose: () => void;
}

interface WikipediaData {
  extract: string;
  title: string;
  pageurl: string;
}

const CompactWikipediaCard: React.FC<CompactWikipediaCardProps> = ({ city, show, onClose }) => {
  const [wikipediaData, setWikipediaData] = useState<WikipediaData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) return;

    const fetchWikipediaData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city.name)}`
        );
        
        if (response.ok) {
          const data = await response.json();
          setWikipediaData({
            extract: data.extract || "No description available.",
            title: data.title || city.name,
            pageurl: data.content_urls?.desktop?.page || '#'
          });
        } else {
          setWikipediaData({
            extract: `${city.name} is a major city in ${city.country}, located in ${city.continent}. With a population of approximately ${city.population.toLocaleString()}, it's one of the significant urban centers in the region.`,
            title: city.name,
            pageurl: '#'
          });
        }
      } catch (error) {
        console.error('Error fetching Wikipedia data:', error);
        setWikipediaData({
          extract: `${city.name} is a major city in ${city.country}, located in ${city.continent}. With a population of approximately ${city.population.toLocaleString()}, it's one of the significant urban centers in the region.`,
          title: city.name,
          pageurl: '#'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWikipediaData();
  }, [city, show]);

  if (!show) return null;

  const cityFacts = [
    { icon: Globe, label: 'Continent', value: city.continent },
    { icon: Users, label: 'Population', value: city.population.toLocaleString() },
    { icon: MapPin, label: 'Country', value: city.country },
  ];

  return (
    <div className="fixed inset-x-4 bottom-20 md:bottom-4 z-50 max-h-[40vh] md:max-h-[50vh]">
      <div className="bg-white/95 backdrop-blur-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-3 border-b-2 border-black bg-accent/10">
          <h3 className="text-sm md:text-base font-black uppercase truncate">
            {city.name}, {city.country}
          </h3>
          <button
            onClick={onClose}
            className="p-1 bg-white border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Carousel Content */}
        <div className="p-3 overflow-y-auto max-h-[30vh] md:max-h-[35vh]">
          <Carousel className="w-full">
            <CarouselContent>
              {/* Wikipedia Info Card */}
              <CarouselItem>
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase text-accent">About</div>
                  {loading ? (
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded animate-pulse" />
                      <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
                      <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs leading-relaxed">
                        {wikipediaData?.extract}
                      </p>
                      {wikipediaData?.pageurl && wikipediaData.pageurl !== '#' && (
                        <a
                          href={wikipediaData.pageurl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-xs font-bold"
                        >
                          Read more on Wikipedia →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </CarouselItem>

              {/* City Facts Card */}
              <CarouselItem>
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase text-accent">Quick Facts</div>
                  <div className="space-y-2">
                    {cityFacts.map((fact, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <fact.icon className="w-3 h-3 text-accent" />
                        <span className="text-xs font-bold">{fact.label}:</span>
                        <span className="text-xs">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            
            {/* Navigation buttons */}
            <div className="flex justify-center gap-2 mt-3">
              <CarouselPrevious className="relative inset-auto translate-x-0 translate-y-0 w-6 h-6 border-black" />
              <CarouselNext className="relative inset-auto translate-x-0 translate-y-0 w-6 h-6 border-black" />
            </div>
          </Carousel>
        </div>

        {/* Swipe hint */}
        <div className="text-center py-2 border-t border-black/20 bg-muted/20">
          <p className="text-xs text-muted-foreground">Swipe or use arrows to explore • Tap outside to close</p>
        </div>
      </div>
    </div>
  );
};

export default CompactWikipediaCard;
