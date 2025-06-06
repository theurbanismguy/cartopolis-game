
export interface City {
  name: string;
  country: string;
  lat: number;
  lng: number;
  population: number;
  continent: string;
}

export const cities: City[] = [
  { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, population: 13960000, continent: "Asia" },
  { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522, population: 2161000, continent: "Europe" },
  { name: "New York", country: "United States", lat: 40.7128, lng: -74.0060, population: 8336000, continent: "North America" },
  { name: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278, population: 8982000, continent: "Europe" },
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, population: 5312000, continent: "Australia" },
  { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729, population: 6748000, continent: "South America" },
  { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357, population: 9500000, continent: "Africa" },
  { name: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777, population: 12478000, continent: "Asia" },
  { name: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6173, population: 11980000, continent: "Europe" },
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018, population: 8281000, continent: "Asia" },
  { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784, population: 15462000, continent: "Europe" },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6118, lng: -58.3960, population: 2890000, continent: "South America" },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792, population: 14368000, continent: "Africa" },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332, population: 9209000, continent: "North America" },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.9780, population: 9776000, continent: "Asia" },
  { name: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050, population: 3669000, continent: "Europe" },
  { name: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241, population: 4618000, continent: "Africa" },
  { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832, population: 2930000, continent: "North America" },
  { name: "Barcelona", country: "Spain", lat: 41.3851, lng: 2.1734, population: 1636000, continent: "Europe" },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198, population: 5454000, continent: "Asia" }
];

export const getRandomCity = (): City => {
  return cities[Math.floor(Math.random() * cities.length)];
};
