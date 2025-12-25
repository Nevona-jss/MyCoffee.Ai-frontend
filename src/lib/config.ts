

export const API_CONFIG = {
  BASE_URL: 'https://api.mycoffeeai.com/',
  // BASE_URL: 'https://mycoffee-ai-backend.onrender.com',
  // BASE_URL: 'http://192.168.1.79:8000/',
  ENDPOINTS: {
    RECOMMENDATION: '/recommendation',
  },
} as const;

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Specific endpoint helpers
export const API_URLS = {
  RECOMMENDATION: getApiUrl(API_CONFIG.ENDPOINTS.RECOMMENDATION),
} as const;
