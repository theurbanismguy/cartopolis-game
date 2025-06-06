
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Globe } from 'lucide-react';
import { City } from '../data/cities';

interface WikipediaInfoProps {
  city: City;
  show: boolean;
}

interface WikipediaData {
  extract: string;
  title: string;
  pageurl: string;
}

const WikipediaInfo: React.FC<WikipediaInfoProps> = ({ city, show }) => {
  const [wikipediaData, setWikipediaData] = useState<WikipediaData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) return;

    const fetchWikipediaData = async () => {
      setLoading(true);
      try {
        // Use Wikipedia API to get city information
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
          // Fallback if Wikipedia API fails
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

  return (
    <Card className="w-full max-w-2xl animate-in slide-in-from-bottom-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          {city.name}, {city.country}
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">
            <Globe className="w-3 h-3 mr-1" />
            {city.continent}
          </Badge>
          <Badge variant="secondary">
            <Users className="w-3 h-3 mr-1" />
            {city.population.toLocaleString()} people
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {wikipediaData?.extract}
            </p>
            {wikipediaData?.pageurl && wikipediaData.pageurl !== '#' && (
              <a
                href={wikipediaData.pageurl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Read more on Wikipedia →
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WikipediaInfo;
