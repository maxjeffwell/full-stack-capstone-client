const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app build directory with proper headers
app.use(
  express.static(path.join(__dirname, 'build'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
      }
    },
    // Don't fall through to next middleware if file not found
    fallthrough: false,
  })
);

// API routes would go here
// app.use('/api', require('./routes/api'));

// Error handler for static files
app.use((err, req, res, next) => {
  if (err && req.path.startsWith('/static/')) {
    return res.status(404).send('File not found');
  }
  next(err);
});

// The "catchall" handler: send back React's index.html file for any non-static routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
