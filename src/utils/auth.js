import axios from 'axios';
import { API_BASE_URL } from '../config';

const TOKEN_KEY = 'jwtToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

class AuthService {
  constructor() {
    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor to add token to all requests
    axios.interceptors.request.use(
      config => {
        const token = this.getToken();
        if (token && config.url.startsWith(API_BASE_URL)) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add CSRF token if available
        const csrfToken = this.getCSRFToken();
        if (csrfToken) {
          config.headers['X-CSRF-Token'] = csrfToken;
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token expiration
    axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
              const response = await axios.post(
                `${API_BASE_URL}/refresh-token`,
                {
                  refreshToken,
                }
              );

              const { token, refreshToken: newRefreshToken } = response.data;
              this.setTokens(token, newRefreshToken);

              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            this.clearTokens();
            window.location.href = '/signin';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Use sessionStorage for better security (cleared when browser closes)
  // In production, consider httpOnly cookies instead
  setTokens(token, refreshToken) {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
    }
    if (refreshToken) {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  setToken(token) {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  getRefreshToken() {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  clearTokens() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decode JWT to check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < exp;
    } catch {
      return false;
    }
  }

  getCSRFToken() {
    // Get CSRF token from meta tag or cookie
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    if (metaTag) {
      return metaTag.getAttribute('content');
    }

    // Fallback to cookie
    const value = `; ${document.cookie}`;
    const parts = value.split(`; csrf-token=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }

    return null;
  }

  // Migrate existing localStorage tokens to sessionStorage
  migrateTokens() {
    const localToken = localStorage.getItem(TOKEN_KEY);
    if (localToken) {
      sessionStorage.setItem(TOKEN_KEY, localToken);
      localStorage.removeItem(TOKEN_KEY);
    }
  }
}

const authService = new AuthService();

export default authService;
