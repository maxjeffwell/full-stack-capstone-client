// Security utilities and configurations

export const SecurityConfig = {
  // Content Security Policy directives
  CSP_DIRECTIVES: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Note: Remove unsafe-inline/eval in production
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
    'img-src': ["'self'", 'data:', 'https:'],
    'connect-src': [
      "'self'",
      process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
      'https://educationelly-server-3147a4688b8b.herokuapp.com',
    ],
  },

  // Security headers that should be set by the server
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  },

  // Session configuration
  SESSION_CONFIG: {
    // Session timeout in milliseconds (30 minutes)
    SESSION_TIMEOUT: 30 * 60 * 1000,
    // Warning before timeout (5 minutes)
    SESSION_WARNING: 5 * 60 * 1000,
  },
};

// XSS Protection utilities
export const sanitizeInput = input => {
  if (typeof input !== 'string') return input;

  // Basic HTML entity encoding
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validate URLs to prevent open redirect vulnerabilities
export const isValidRedirectUrl = url => {
  try {
    const urlObj = new URL(url, window.location.origin);
    // Only allow redirects to same origin
    return urlObj.origin === window.location.origin;
  } catch {
    return false;
  }
};

// Session timeout manager
export class SessionManager {
  constructor(onTimeout, onWarning) {
    this.onTimeout = onTimeout;
    this.onWarning = onWarning;
    this.timeoutId = null;
    this.warningId = null;
  }

  start() {
    this.reset();
  }

  reset() {
    this.clear();

    // Set warning timeout
    this.warningId = setTimeout(() => {
      if (this.onWarning) {
        this.onWarning();
      }
    }, SecurityConfig.SESSION_CONFIG.SESSION_TIMEOUT - SecurityConfig.SESSION_CONFIG.SESSION_WARNING);

    // Set session timeout
    this.timeoutId = setTimeout(() => {
      if (this.onTimeout) {
        this.onTimeout();
      }
    }, SecurityConfig.SESSION_CONFIG.SESSION_TIMEOUT);
  }

  clear() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.warningId) {
      clearTimeout(this.warningId);
      this.warningId = null;
    }
  }

  destroy() {
    this.clear();
  }
}

// Rate limiting for API calls
export class RateLimiter {
  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  isAllowed(key) {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Clean up old requests
    for (const [timestamp] of this.requests) {
      if (timestamp < windowStart) {
        this.requests.delete(timestamp);
      }
    }

    const recentRequests = Array.from(this.requests.keys()).filter(
      timestamp => timestamp >= windowStart
    );

    if (recentRequests.length >= this.maxRequests) {
      return false;
    }

    this.requests.set(now, key);
    return true;
  }

  reset() {
    this.requests.clear();
  }
}
