// Performance utilities for monitoring and optimization
/* eslint-disable no-console */
import React from 'react';

// Web Vitals measurement
export const measureWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals')
      .then(webVitals => {
        // Handle both named exports and default export patterns
        const { onCLS, onFID, onFCP, onLCP, onTTFB } =
          webVitals.default || webVitals;

        if (onCLS && typeof onCLS === 'function') onCLS(onPerfEntry);
        if (onFID && typeof onFID === 'function') onFID(onPerfEntry);
        if (onFCP && typeof onFCP === 'function') onFCP(onPerfEntry);
        if (onLCP && typeof onLCP === 'function') onLCP(onPerfEntry);
        if (onTTFB && typeof onTTFB === 'function') onTTFB(onPerfEntry);
      })
      .catch(error => {
        console.warn('Failed to load web-vitals:', error);
        // Fallback to basic performance measurement
        if (window.performance && window.performance.getEntriesByType) {
          const navigationEntries =
            window.performance.getEntriesByType('navigation');
          if (navigationEntries.length > 0) {
            const navEntry = navigationEntries[0];
            onPerfEntry({
              name: 'basic-load-time',
              value: navEntry.loadEventEnd - navEntry.loadEventStart,
              id: `basic-${Date.now()}`,
            });
          }
        }
      });
  }
};

// Component render timing
export const withPerformanceLogging = (WrappedComponent, componentName) => {
  return React.forwardRef((props, ref) => {
    React.useEffect(() => {
      const startTime = performance.now();
      return () => {
        const endTime = performance.now();
        if (process.env.NODE_ENV === 'development') {
          console.log(`${componentName} render time: ${endTime - startTime}ms`);
        }
      };
    });

    return React.createElement(WrappedComponent, { ...props, ref });
  });
};

// Bundle size analyzer
export const logBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const styles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
    );

    console.group('Bundle Analysis');
    console.log('Script files:', scripts.length);
    console.log('CSS files:', styles.length);

    scripts.forEach((script, index) => {
      console.log(`Script ${index + 1}:`, script.src);
    });

    styles.forEach((style, index) => {
      console.log(`Style ${index + 1}:`, style.href);
    });
    console.groupEnd();
  }
};

// Memory usage monitoring
export const logMemoryUsage = () => {
  if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
    const memory = performance.memory;
    console.group('Memory Usage');
    console.log(
      'Used:',
      (memory.usedJSHeapSize / 1024 / 1024).toFixed(2),
      'MB'
    );
    console.log(
      'Total:',
      (memory.totalJSHeapSize / 1024 / 1024).toFixed(2),
      'MB'
    );
    console.log(
      'Limit:',
      (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2),
      'MB'
    );
    console.groupEnd();
  }
};

// Debounce utility for performance optimization
export const debounce = (func, wait, immediate) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

// Throttle utility for performance optimization
export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
