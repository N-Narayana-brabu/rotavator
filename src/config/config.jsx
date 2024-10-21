// src/config.js
const config = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000', // Default URL for local development
    API_ENDPOINTS: {
      GET_HEADER: '/api/data/header', // Header data endpoint
      GET_SLIDER: '/api/data/slider', // Slider data endpoint
    },
  };
  
  export default config;
  