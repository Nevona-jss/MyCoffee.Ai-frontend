// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.mycoffeeai.com/',
  // BASE_URL: 'https://mycoffee-ai-backend.onrender.com',
  // BASE_URL: 'http://192.168.1.79:3000',

  ENDPOINTS: {
    RECOMMENDATION: '/recommendation',
    // Add other endpoints here as needed
    // USERS: '/users',
    // AUTH: '/auth',
  },
} as const;

// Helper function to get full URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Specific endpoint helpers
export const API_URLS = {
  RECOMMENDATION: getApiUrl(API_CONFIG.ENDPOINTS.RECOMMENDATION),
  // Add other specific URLs here
  // USERS: getApiUrl(API_CONFIG.ENDPOINTS.USERS),
  // AUTH: getApiUrl(API_CONFIG.ENDPOINTS.AUTH),
} as const;
