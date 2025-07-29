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
  })
);

// API routes would go here
// app.use('/api', require('./routes/api'));

// The "catchall" handler: send back React's index.html file for any non-static routes
// Express static middleware will handle static files first, so this only catches non-static routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
