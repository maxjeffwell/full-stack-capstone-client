// data layer control for redux (app root) - start up redux side of things in the app,
// render root component but limit react configuration here

import React from 'react';
import { createRoot } from 'react-dom/client';

// BrowserRouter tells react router what to do - looks at current url and changes components visible on screen
// Route is a react component used to set a rule between a certain route in the application and a set of
// components that will be available on screen

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import WebFont from 'webfontloader';

// Import only the Semantic UI components we actually use
import 'semantic-ui-css/components/reset.css';
import 'semantic-ui-css/components/site.css';
import 'semantic-ui-css/components/button.css';
import 'semantic-ui-css/components/container.css';
import 'semantic-ui-css/components/grid.css';
import 'semantic-ui-css/components/header.css';
import 'semantic-ui-css/components/form.css';
import 'semantic-ui-css/components/icon.css';
import 'semantic-ui-css/components/image.css';
import 'semantic-ui-css/components/segment.css';
import 'semantic-ui-css/components/message.css';
import 'semantic-ui-css/components/card.css';
import 'semantic-ui-css/components/menu.css';
import 'semantic-ui-css/components/input.css';
import 'semantic-ui-css/components/sidebar.css';
import 'semantic-ui-css/components/dimmer.css';
import 'semantic-ui-css/components/loader.css';

import { store } from './store';
import App from './components/App';
import authService from './utils/auth';
import {
  measureWebVitals,
  logBundleSize,
  logMemoryUsage,
} from './utils/performance';

// Optimized font loading with fallback
WebFont.load({
  google: {
    families: ['Roboto:400', 'Arimo:400', 'sans-serif'],
  },
  timeout: 2000,
  loading: () => {
    // Optional: show loading state
  },
  active: () => {
    // Font loaded successfully
    document.documentElement.classList.add('fonts-loaded');
  },
  inactive: () => {
    // Font failed to load, use fallback
    document.documentElement.classList.add('fonts-failed');
  },
});

// Migrate any existing localStorage tokens to sessionStorage
authService.migrateTokens();

const theme = {
  orange: '#fb9438',
  blue: '#2873b4',
  green: '#86c64e',
  white: '#f5f5f5',
};

// React 18 new rendering API
const container = document.getElementById('root');
const root = createRoot(container);

// ReactDOM - two arguments - root component and where we want to render that component inside of the DOM
// root component is the app component
// create redux store at top level of app and connect it to react by placing provider tag
// provider is a react component (provided by react-redux store) that can read changes from redux store
// anytime redux store state changes the provider component informs all of its children components

root.render(
  <HelmetProvider>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </HelmetProvider>
);

// Performance monitoring (development only)
if (process.env.NODE_ENV === 'development') {
  // Log bundle and memory usage
  setTimeout(() => {
    logBundleSize();
    logMemoryUsage();
  }, 1000);

  // Set up periodic memory monitoring
  setInterval(logMemoryUsage, 30000); // Every 30 seconds
}

// Measure web vitals
measureWebVitals(metric => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('Web Vital:', metric);
  }
  // In production, you might want to send these to an analytics service
});

// Debug environment
console.log('🔧 NODE_ENV:', process.env.NODE_ENV);
console.log('🔧 Development mode:', process.env.NODE_ENV === 'development');

// Force service worker cleanup (regardless of environment for debugging)
if ('serviceWorker' in navigator) {
  // Check if we need to reload after cleanup
  const needsReload = localStorage.getItem('sw-cleanup-done') !== 'true';

  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    if (registrations.length > 0) {
      console.log(
        '🧹 Found',
        registrations.length,
        'service workers to unregister'
      );
      Promise.all(
        registrations.map(registration => {
          console.log('🧹 Unregistering SW:', registration.scope);
          return registration.unregister();
        })
      ).then(() => {
        if (needsReload) {
          localStorage.setItem('sw-cleanup-done', 'true');
          console.log('🧹 Service workers unregistered, reloading page...');
          window.location.reload();
        }
      });
    }
  });

  // Clear all caches
  caches.keys().then(function (names) {
    if (names.length > 0) {
      Promise.all(
        names.map(name => {
          console.log('🧹 Deleting cache:', name);
          return caches.delete(name);
        })
      ).then(() => {
        console.log('🧹 All caches cleared');
      });
    }
  });

  // Clear localStorage flag after 5 seconds to allow future cleanups
  setTimeout(() => {
    localStorage.removeItem('sw-cleanup-done');
  }, 5000);
}

// Service worker completely disabled for debugging
// if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/sw.js')
//       .then(registration => {
//         // eslint-disable-next-line no-console
//         console.log('SW registered: ', registration);
//       })
//       .catch(registrationError => {
//         // eslint-disable-next-line no-console
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }
