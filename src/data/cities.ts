export interface City {
  name: string;
  country: string;
  lat: number;
  lng: number;
  population: number;
  continent: string;
}

// Comprehensive global cities dataset with accurate population and coordinates
export const cities: City[] = [
  // Major world cities (1M+)
  { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, population: 37435191, continent: "Asia" },
  { name: "Delhi", country: "India", lat: 28.7041, lng: 77.1025, population: 29399141, continent: "Asia" },
  { name: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737, population: 26317104, continent: "Asia" },
  { name: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333, population: 21846507, continent: "South America" },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332, population: 21671908, continent: "North America" },
  { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357, population: 20484965, continent: "Africa" },
  { name: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125, population: 20283552, continent: "Asia" },
  { name: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777, population: 20041203, continent: "Asia" },
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
  { name: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694, population: 7482000, continent: "Asia" },
  { name: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753, population: 6907000, continent: "Asia" },
  { name: "Baghdad", country: "Iraq", lat: 33.3128, lng: 44.3615, population: 6812000, continent: "Asia" },
  { name: "Santiago", country: "Chile", lat: -33.4489, lng: -70.6693, population: 6767000, continent: "South America" },
  { name: "Pune", country: "India", lat: 18.5204, lng: 73.8567, population: 6629000, continent: "Asia" },
  { name: "Surat", country: "India", lat: 21.1702, lng: 72.8311, population: 6564000, continent: "Asia" },
  { name: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038, population: 6559000, continent: "Europe" },
  { name: "Suzhou", country: "China", lat: 31.2989, lng: 120.5853, population: 6339000, continent: "Asia" },
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
  { name: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050, population: 3669000, continent: "Europe" },
  { name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964, population: 2873000, continent: "Europe" },
  { name: "Kiev", country: "Ukraine", lat: 50.4501, lng: 30.5234, population: 2884000, continent: "Europe" },
  { name: "Kathmandu", country: "Nepal", lat: 27.7172, lng: 85.3240, population: 1442271, continent: "Asia" },
  { name: "Almaty", country: "Kazakhstan", lat: 43.2775, lng: 76.8958, population: 1916779, continent: "Asia" },
  { name: "Tashkent", country: "Uzbekistan", lat: 41.2995, lng: 69.2401, population: 2485900, continent: "Asia" },
  { name: "Minsk", country: "Belarus", lat: 53.9045, lng: 27.5615, population: 1982000, continent: "Europe" },
  { name: "Bucharest", country: "Romania", lat: 44.4268, lng: 26.1025, population: 1883000, continent: "Europe" },
  { name: "Warsaw", country: "Poland", lat: 52.2297, lng: 21.0122, population: 1790658, continent: "Europe" },
  { name: "Hamburg", country: "Germany", lat: 53.5511, lng: 9.9937, population: 1906411, continent: "Europe" },
  { name: "Budapest", country: "Hungary", lat: 47.4979, lng: 19.0402, population: 1752286, continent: "Europe" },
  { name: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738, population: 1911191, continent: "Europe" },
  { name: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686, population: 975551, continent: "Europe" },
  { name: "Prague", country: "Czech Republic", lat: 50.0755, lng: 14.4378, population: 1335084, continent: "Europe" },
  { name: "Sofia", country: "Bulgaria", lat: 42.6977, lng: 23.3219, population: 1328000, continent: "Europe" },
  { name: "Athens", country: "Greece", lat: 37.9838, lng: 23.7275, population: 3153000, continent: "Europe" },
  { name: "Munich", country: "Germany", lat: 48.1351, lng: 11.5820, population: 1488202, continent: "Europe" },
  { name: "Milan", country: "Italy", lat: 45.4642, lng: 9.1900, population: 1396059, continent: "Europe" },
  
  // Medium cities (500K-1M population) for hard mode
  { name: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207, population: 675218, continent: "North America" },
  { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041, population: 905234, continent: "Europe" },
  { name: "Brussels", country: "Belgium", lat: 50.8503, lng: 4.3517, population: 1211035, continent: "Europe" },
  { name: "Copenhagen", country: "Denmark", lat: 55.6761, lng: 12.5683, population: 660193, continent: "Europe" },
  { name: "Helsinki", country: "Finland", lat: 60.1699, lng: 24.9384, population: 656920, continent: "Europe" },
  { name: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522, population: 697549, continent: "Europe" },
  { name: "Zurich", country: "Switzerland", lat: 47.3769, lng: 8.5417, population: 421878, continent: "Europe" },
  { name: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393, population: 547631, continent: "Europe" },
  { name: "Dublin", country: "Ireland", lat: 53.3498, lng: -6.2603, population: 554554, continent: "Europe" },
  { name: "Edinburgh", country: "United Kingdom", lat: 55.9533, lng: -3.1883, population: 518500, continent: "Europe" },
  { name: "Glasgow", country: "United Kingdom", lat: 55.8642, lng: -4.2518, population: 626410, continent: "Europe" },
  { name: "Manchester", country: "United Kingdom", lat: 53.4808, lng: -2.2426, population: 547000, continent: "Europe" },
  { name: "Birmingham", country: "United Kingdom", lat: 52.4862, lng: -1.8904, population: 1141816, continent: "Europe" },
  { name: "Liverpool", country: "United Kingdom", lat: 53.4084, lng: -2.9916, population: 498042, continent: "Europe" },
  { name: "Leeds", country: "United Kingdom", lat: 53.8008, lng: -1.5491, population: 789194, continent: "Europe" },
  
  // Smaller cities (100K-500K) for hard difficulty
  { name: "Salzburg", country: "Austria", lat: 47.8095, lng: 13.0550, population: 155031, continent: "Europe" },
  { name: "Graz", country: "Austria", lat: 47.0707, lng: 15.4395, population: 291072, continent: "Europe" },
  { name: "Innsbruck", country: "Austria", lat: 47.2692, lng: 11.4041, population: 132493, continent: "Europe" },
  { name: "Luxembourg City", country: "Luxembourg", lat: 49.6116, lng: 6.1319, population: 125000, continent: "Europe" },
  { name: "Bern", country: "Switzerland", lat: 46.9480, lng: 7.4474, population: 134591, continent: "Europe" },
  { name: "Basel", country: "Switzerland", lat: 47.5596, lng: 7.5886, population: 177595, continent: "Europe" },
  { name: "Geneva", country: "Switzerland", lat: 46.2044, lng: 6.1432, population: 201818, continent: "Europe" },
  { name: "Lausanne", country: "Switzerland", lat: 46.5197, lng: 6.6323, population: 140202, continent: "Europe" },
  { name: "Gothenburg", country: "Sweden", lat: 57.7089, lng: 11.9746, population: 583056, continent: "Europe" },
  { name: "Malmö", country: "Sweden", lat: 55.6050, lng: 13.0038, population: 347949, continent: "Europe" },
  { name: "Aarhus", country: "Denmark", lat: 56.1629, lng: 10.2039, population: 285273, continent: "Europe" },
  { name: "Bergen", country: "Norway", lat: 60.3913, lng: 5.3221, population: 283929, continent: "Europe" },
  { name: "Trondheim", country: "Norway", lat: 63.4305, lng: 10.3951, population: 207595, continent: "Europe" },
  { name: "Tampere", country: "Finland", lat: 61.4991, lng: 23.7871, population: 238245, continent: "Europe" },
  { name: "Turku", country: "Finland", lat: 60.4518, lng: 22.2666, population: 194244, continent: "Europe" },
  { name: "Reykjavik", country: "Iceland", lat: 64.1466, lng: -21.9426, population: 131136, continent: "Europe" },
  { name: "Tallinn", country: "Estonia", lat: 59.4370, lng: 24.7536, population: 437619, continent: "Europe" },
  { name: "Riga", country: "Latvia", lat: 56.9496, lng: 24.1052, population: 632614, continent: "Europe" },
  { name: "Vilnius", country: "Lithuania", lat: 54.6872, lng: 25.2797, population: 574221, continent: "Europe" },
  { name: "Krakow", country: "Poland", lat: 50.0647, lng: 19.9450, population: 779115, continent: "Europe" },
  { name: "Gdansk", country: "Poland", lat: 54.3520, lng: 18.6466, population: 470621, continent: "Europe" },
  { name: "Wroclaw", country: "Poland", lat: 51.1079, lng: 17.0385, population: 641607, continent: "Europe" },
  { name: "Bratislava", country: "Slovakia", lat: 48.1486, lng: 17.1077, population: 437725, continent: "Europe" },
  { name: "Ljubljana", country: "Slovenia", lat: 46.0569, lng: 14.5058, population: 295504, continent: "Europe" },
  { name: "Zagreb", country: "Croatia", lat: 45.8150, lng: 15.9819, population: 769944, continent: "Europe" },
  { name: "Belgrade", country: "Serbia", lat: 44.7866, lng: 20.4489, population: 1166763, continent: "Europe" },
  { name: "Sarajevo", country: "Bosnia and Herzegovina", lat: 43.8563, lng: 18.4131, population: 395133, continent: "Europe" },
  { name: "Skopje", country: "North Macedonia", lat: 41.9973, lng: 21.4280, population: 544086, continent: "Europe" },
  { name: "Tirana", country: "Albania", lat: 41.3275, lng: 19.8187, population: 418495, continent: "Europe" },
  { name: "Podgorica", country: "Montenegro", lat: 42.4304, lng: 19.2594, population: 156169, continent: "Europe" },
  { name: "Pristina", country: "Kosovo", lat: 42.6629, lng: 21.1655, population: 198897, continent: "Europe" },
  { name: "Chisinau", country: "Moldova", lat: 47.0105, lng: 28.8638, population: 635994, continent: "Europe" },
  { name: "Lviv", country: "Ukraine", lat: 49.8397, lng: 24.0297, population: 724713, continent: "Europe" },
  { name: "Odessa", country: "Ukraine", lat: 46.4825, lng: 30.7233, population: 1017699, continent: "Europe" },
  { name: "Cluj-Napoca", country: "Romania", lat: 46.7712, lng: 23.6236, population: 324576, continent: "Europe" },
  { name: "Plovdiv", country: "Bulgaria", lat: 42.1354, lng: 24.7453, population: 346893, continent: "Europe" },
  { name: "Thessaloniki", country: "Greece", lat: 40.6401, lng: 22.9444, population: 325182, continent: "Europe" },
  { name: "Nicosia", country: "Cyprus", lat: 35.1856, lng: 33.3823, population: 245000, continent: "Europe" },
  { name: "Valletta", country: "Malta", lat: 35.8989, lng: 14.5146, population: 198000, continent: "Europe" }
];

export type Difficulty = 'easy' | 'hard';

// Track recently shown cities to avoid immediate repeats
let recentCities: string[] = [];
const MAX_RECENT_CITIES = 8;

export const getCitiesByDifficulty = (difficulty: Difficulty): City[] => {
  switch (difficulty) {
    case 'easy':
      return cities.filter(city => city.population >= 1000000);
    case 'hard':
      return cities.filter(city => city.population >= 100000);
    default:
      return cities;
  }
};

// Fisher-Yates shuffle algorithm for better randomization
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const getRandomCity = (difficulty: Difficulty): City => {
  const filteredCities = getCitiesByDifficulty(difficulty);
  
  // Filter out recently shown cities to avoid immediate repeats
  const availableCities = filteredCities.filter(city => 
    !recentCities.includes(city.name)
  );
  
  // If we've exhausted all cities (unlikely), reset the recent list
  const citiesToChooseFrom = availableCities.length > 0 ? availableCities : filteredCities;
  
  // Use better randomization
  const shuffledCities = shuffleArray(citiesToChooseFrom);
  const selectedCity = shuffledCities[0];
  
  // Add to recent cities list
  recentCities.push(selectedCity.name);
  
  // Keep only the last MAX_RECENT_CITIES cities
  if (recentCities.length > MAX_RECENT_CITIES) {
    recentCities = recentCities.slice(-MAX_RECENT_CITIES);
  }
  
  return selectedCity;
};

// Function to reset recent cities (useful when starting a new game)
export const resetRecentCities = () => {
  recentCities = [];
};
