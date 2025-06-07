export interface City {
  name: string;
  country: string;
  lat: number;
  lng: number;
  population: number;
  continent: string;
}

// Enhanced list of cities with population > 100,000 from OpenDataSoft
export const cities: City[] = [
  { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, population: 13960000, continent: "Asia" },
  { name: "Delhi", country: "India", lat: 28.7041, lng: 77.1025, population: 29617000, continent: "Asia" },
  { name: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737, population: 24484000, continent: "Asia" },
  { name: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333, population: 22429000, continent: "South America" },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332, population: 21671000, continent: "North America" },
  { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357, population: 20485000, continent: "Africa" },
  { name: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125, population: 20284000, continent: "Asia" },
  { name: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777, population: 20041000, continent: "Asia" },
  { name: "Beijing", country: "China", lat: 39.9042, lng: 116.4074, population: 19618000, continent: "Asia" },
  { name: "Osaka", country: "Japan", lat: 34.6937, lng: 135.5023, population: 19281000, continent: "Asia" },
  { name: "New York", country: "United States", lat: 40.7128, lng: -74.0060, population: 18804000, continent: "North America" },
  { name: "Karachi", country: "Pakistan", lat: 24.8607, lng: 67.0011, population: 15741000, continent: "Asia" },
  { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784, population: 15462000, continent: "Europe" },
  { name: "Chongqing", country: "China", lat: 29.4316, lng: 106.9123, population: 15354000, continent: "Asia" },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6118, lng: -58.3960, population: 15024000, continent: "South America" },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792, population: 14368000, continent: "Africa" },
  { name: "Kolkata", country: "India", lat: 22.5726, lng: 88.3639, population: 14681000, continent: "Asia" },
  { name: "Kinshasa", country: "Democratic Republic of the Congo", lat: -4.4419, lng: 15.2663, population: 13171000, continent: "Africa" },
  { name: "Manila", country: "Philippines", lat: 14.5995, lng: 120.9842, population: 13482000, continent: "Asia" },
  { name: "Tianjin", country: "China", lat: 39.3434, lng: 117.3616, population: 13215000, continent: "Asia" },
  { name: "Guangzhou", country: "China", lat: 23.1291, lng: 113.2644, population: 12638000, continent: "Asia" },
  { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729, population: 12272000, continent: "South America" },
  { name: "Lahore", country: "Pakistan", lat: 31.5497, lng: 74.3436, population: 11738000, continent: "Asia" },
  { name: "Bangalore", country: "India", lat: 12.9716, lng: 77.5946, population: 11440000, continent: "Asia" },
  { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522, population: 11017000, continent: "Europe" },
  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456, population: 10770000, continent: "Asia" },
  { name: "Chennai", country: "India", lat: 13.0827, lng: 80.2707, population: 10456000, continent: "Asia" },
  { name: "Lima", country: "Peru", lat: -12.0464, lng: -77.0428, population: 10391000, continent: "South America" },
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018, population: 10156000, continent: "Asia" },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.9780, population: 9776000, continent: "Asia" },
  { name: "Nagoya", country: "Japan", lat: 35.1815, lng: 136.9066, population: 9872000, continent: "Asia" },
  { name: "Hyderabad", country: "India", lat: 17.3850, lng: 78.4867, population: 9482000, continent: "Asia" },
  { name: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278, population: 9304000, continent: "Europe" },
  { name: "Tehran", country: "Iran", lat: 35.6892, lng: 51.3890, population: 8896000, continent: "Asia" },
  { name: "Chicago", country: "United States", lat: 41.8781, lng: -87.6298, population: 8864000, continent: "North America" },
  { name: "Chengdu", country: "China", lat: 30.5728, lng: 104.0668, population: 8813000, continent: "Asia" },
  { name: "Nanjing", country: "China", lat: 32.0603, lng: 118.7969, population: 8505000, continent: "Asia" },
  { name: "Wuhan", country: "China", lat: 30.5928, lng: 114.3055, population: 8364000, continent: "Asia" },
  { name: "Ho Chi Minh City", country: "Vietnam", lat: 10.8231, lng: 106.6297, population: 8314000, continent: "Asia" },
  { name: "Luanda", country: "Angola", lat: -8.8390, lng: 13.2894, population: 8330000, continent: "Africa" },
  { name: "Ahmedabad", country: "India", lat: 23.0225, lng: 72.5714, population: 8059000, continent: "Asia" },
  { name: "Kuala Lumpur", country: "Malaysia", lat: 3.1390, lng: 101.6869, population: 7996000, continent: "Asia" },
  { name: "Xi'an", country: "China", lat: 34.2658, lng: 108.9541, population: 7444000, continent: "Asia" },
  { name: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694, population: 7482000, continent: "Asia" },
  { name: "Dongguan", country: "China", lat: 23.0489, lng: 113.7447, population: 7434000, continent: "Asia" },
  { name: "Hangzhou", country: "China", lat: 30.2741, lng: 120.1551, population: 7236000, continent: "Asia" },
  { name: "Foshan", country: "China", lat: 23.0218, lng: 113.1219, population: 7194000, continent: "Asia" },
  { name: "Shenyang", country: "China", lat: 41.8057, lng: 123.4315, population: 6921000, continent: "Asia" },
  { name: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753, population: 6907000, continent: "Asia" },
  { name: "Baghdad", country: "Iraq", lat: 33.3128, lng: 44.3615, population: 6812000, continent: "Asia" },
  { name: "Santiago", country: "Chile", lat: -33.4489, lng: -70.6693, population: 6767000, continent: "South America" },
  { name: "Pune", country: "India", lat: 18.5204, lng: 73.8567, population: 6629000, continent: "Asia" },
  { name: "Surat", country: "India", lat: 21.1702, lng: 72.8311, population: 6564000, continent: "Asia" },
  { name: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038, population: 6559000, continent: "Europe" },
  { name: "Suzhou", country: "China", lat: 31.2989, lng: 120.5853, population: 6339000, continent: "Asia" },
  { name: "Pune", country: "India", lat: 18.5204, lng: 73.8567, population: 6276000, continent: "Asia" },
  { name: "Harbin", country: "China", lat: 45.8038, lng: 126.5349, population: 6115000, continent: "Asia" },
  { name: "Houston", country: "United States", lat: 29.7604, lng: -95.3698, population: 6115000, continent: "North America" },
  { name: "Dallas", country: "United States", lat: 32.7767, lng: -96.7970, population: 6099000, continent: "North America" },
  { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832, population: 6082000, continent: "North America" },
  { name: "Dar es Salaam", country: "Tanzania", lat: -6.7924, lng: 39.2083, population: 6048000, continent: "Africa" },
  { name: "Miami", country: "United States", lat: 25.7617, lng: -80.1918, population: 6036000, continent: "North America" },
  { name: "Belo Horizonte", country: "Brazil", lat: -19.9167, lng: -43.9345, population: 5972000, continent: "South America" },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198, population: 5454000, continent: "Asia" },
  { name: "Philadelphia", country: "United States", lat: 39.9526, lng: -75.1652, population: 5695000, continent: "North America" },
  { name: "Washington", country: "United States", lat: 38.9072, lng: -77.0369, population: 5582000, continent: "North America" },
  { name: "Atlanta", country: "United States", lat: 33.7490, lng: -84.3880, population: 5564000, continent: "North America" },
  { name: "Khartoum", country: "Sudan", lat: 15.5007, lng: 32.5599, population: 5534000, continent: "Africa" },
  { name: "Barcelona", country: "Spain", lat: 41.3851, lng: 2.1734, population: 5494000, continent: "Europe" },
  { name: "Yangon", country: "Myanmar", lat: 16.8661, lng: 96.1951, population: 5420000, continent: "Asia" },
  { name: "Alexandria", country: "Egypt", lat: 31.2001, lng: 29.9187, population: 5086000, continent: "Africa" },
  { name: "Guadalajara", country: "Mexico", lat: 20.6597, lng: -103.3496, population: 5023000, continent: "North America" },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631, population: 4968000, continent: "Australia" },
  { name: "Phoenix", country: "United States", lat: 33.4484, lng: -112.0740, population: 4845000, continent: "North America" },
  { name: "Boston", country: "United States", lat: 42.3601, lng: -71.0589, population: 4794000, continent: "North America" },
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, population: 4627000, continent: "Australia" },
  { name: "San Francisco", country: "United States", lat: 37.7749, lng: -122.4194, population: 4594000, continent: "North America" },
  { name: "Detroit", country: "United States", lat: 42.3314, lng: -83.0458, population: 4392000, continent: "North America" },
  { name: "Riverside", country: "United States", lat: 33.9533, lng: -117.3962, population: 4599000, continent: "North America" },
  { name: "Naples", country: "Italy", lat: 40.8518, lng: 14.2681, population: 4434000, continent: "Europe" },
  { name: "Casablanca", country: "Morocco", lat: 33.5731, lng: -7.5898, population: 4370000, continent: "Africa" },
  { name: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241, population: 4524000, continent: "Africa" },
  { name: "Montreal", country: "Canada", lat: 45.5017, lng: -73.5673, population: 4098000, continent: "North America" },
  // Adding more cities with 100K+ population for hard difficulty
  { name: "Freiburg", country: "Germany", lat: 47.9990, lng: 7.8421, population: 230940, continent: "Europe" },
  { name: "Salzburg", country: "Austria", lat: 47.8095, lng: 13.0550, population: 155021, continent: "Europe" },
  { name: "Bordeaux", country: "France", lat: 44.8378, lng: -0.5792, population: 249712, continent: "Europe" },
  { name: "Nantes", country: "France", lat: 47.2184, lng: -1.5536, population: 309346, continent: "Europe" },
  { name: "Strasbourg", country: "France", lat: 48.5734, lng: 7.7521, population: 280966, continent: "Europe" },
  { name: "Lille", country: "France", lat: 50.6292, lng: 3.0573, population: 232741, continent: "Europe" },
  { name: "Rennes", country: "France", lat: 48.1173, lng: -1.6778, population: 217728, continent: "Europe" },
  { name: "Reims", country: "France", lat: 49.2583, lng: 4.0317, population: 183042, continent: "Europe" },
  { name: "Le Havre", country: "France", lat: 49.4944, lng: 0.1079, population: 170147, continent: "Europe" },
  { name: "Saint-Étienne", country: "France", lat: 45.4397, lng: 4.3872, population: 171057, continent: "Europe" },
  { name: "Toulon", country: "France", lat: 43.1242, lng: 5.9280, population: 171953, continent: "Europe" },
  { name: "Angers", country: "France", lat: 47.4784, lng: -0.5632, population: 154508, continent: "Europe" },
  { name: "Grenoble", country: "France", lat: 45.1885, lng: 5.7245, population: 158454, continent: "Europe" },
  { name: "Dijon", country: "France", lat: 47.3220, lng: 5.0415, population: 156920, continent: "Europe" },
  { name: "Nîmes", country: "France", lat: 43.8367, lng: 4.3601, population: 151001, continent: "Europe" },
  { name: "Aix-en-Provence", country: "France", lat: 43.5297, lng: 5.4474, population: 145071, continent: "Europe" },
  { name: "Brest", country: "France", lat: 48.3905, lng: -4.4860, population: 139676, continent: "Europe" },
  { name: "Le Mans", country: "France", lat: 48.0077, lng: 0.1996, population: 143599, continent: "Europe" },
  { name: "Amiens", country: "France", lat: 49.8941, lng: 2.2958, population: 133891, continent: "Europe" },
  { name: "Tours", country: "France", lat: 47.3941, lng: 0.6848, population: 136463, continent: "Europe" },
  { name: "Limoges", country: "France", lat: 45.8336, lng: 1.2611, population: 132175, continent: "Europe" },
  { name: "Villeurbanne", country: "France", lat: 45.7640, lng: 4.8827, population: 147712, continent: "Europe" },
  { name: "Clermont-Ferrand", country: "France", lat: 45.7797, lng: 3.0863, population: 143886, continent: "Europe" },
  { name: "Besançon", country: "France", lat: 47.2380, lng: 6.0243, population: 116914, continent: "Europe" },
  { name: "Orléans", country: "France", lat: 47.9029, lng: 1.9093, population: 116269, continent: "Europe" },
  { name: "Rouen", country: "France", lat: 49.4431, lng: 1.0993, population: 110145, continent: "Europe" },
  { name: "Mulhouse", country: "France", lat: 47.7508, lng: 7.3359, population: 108312, continent: "Europe" },
  { name: "Perpignan", country: "France", lat: 42.6886, lng: 2.8956, population: 121934, continent: "Europe" },
  { name: "Caen", country: "France", lat: 49.1829, lng: -0.3707, population: 105512, continent: "Europe" },
  { name: "Boulogne-Billancourt", country: "France", lat: 48.8336, lng: 2.2401, population: 120071, continent: "Europe" },
  { name: "Metz", country: "France", lat: 49.1193, lng: 6.1757, population: 116429, continent: "Europe" },
  { name: "Nancy", country: "France", lat: 48.6921, lng: 6.1844, population: 104885, continent: "Europe" },
];

export type Difficulty = 'easy' | 'medium' | 'hard';

export const getCitiesByDifficulty = (difficulty: Difficulty): City[] => {
  switch (difficulty) {
    case 'easy':
      return cities.filter(city => city.population >= 1000000);
    case 'medium':
      return cities.filter(city => city.population >= 500000);
    case 'hard':
      return cities.filter(city => city.population >= 100000);
    default:
      return cities;
  }
};

export const getRandomCity = (difficulty: Difficulty = 'medium'): City => {
  const availableCities = getCitiesByDifficulty(difficulty);
  return availableCities[Math.floor(Math.random() * availableCities.length)];
};
