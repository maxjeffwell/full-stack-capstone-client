// This file is automatically loaded by Create React App and allows us to configure the development server
// const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Add security headers in development
  app.use((req, res, next) => {
    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Permissions-Policy',
      'geolocation=(), microphone=(), camera=()'
    );

    // Basic CSP for development (temporarily disabled for debugging)
    // res.setHeader(
    //   'Content-Security-Policy',
    //   "default-src 'self'; " +
    //     "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    //     "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    //     "font-src 'self' https://fonts.gstatic.com; " +
    //     "img-src 'self' data: https:; " +
    //     "connect-src 'self' http://localhost:8080 ws://localhost:3000 https://educationelly-server-3147a4688b8b.herokuapp.com;"
    // );

    next();
  });

  // Temporarily disable proxy for troubleshooting
  // app.use(
  //   '/api',
  //   createProxyMiddleware({
  //     target: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': '', // Remove /api prefix when forwarding to backend
  //     },
  //   })
  // );
};
