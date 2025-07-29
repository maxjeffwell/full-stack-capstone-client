// Force localhost for development - ignore environment variables for now
export const API_BASE_URL = 'http://localhost:8080';

// Debug: Log the actual URL being used
console.log('🔧 API_BASE_URL being used:', API_BASE_URL);
console.log('🔧 Environment variable was:', process.env.REACT_APP_API_BASE_URL);
