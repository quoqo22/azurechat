const express = require('express');
const helmet = require('helmet');
const next = require('next');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  server.use(helmet());

//   server.use((req, res, next) => {
//     res.setHeader('X-Frame-Options', 'ALLOW-FROM http://localhost:3000');
//     return next();
//   });

  server.use((req, res, next) => {
    // Set CSP header to allow inline scripts using 'unsafe-inline'
    res.setHeader(
      'Content-Security-Policy',
      "script-src 'self' 'unsafe-inline' 'unsafe-eval';"
    );
    return next();
  });


  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});


// const express = require('express');
// const helmet = require('helmet');
// const next = require('next');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// const port = process.env.PORT || 3000;

// app.prepare().then(() => {
//   const server = express();

//   // Add Helmet middleware for security headers
//   server.use(helmet());

//   // Configure Content Security Policy (CSP) headers
//   server.use((req, res, next) => {
//     // Set CSP header to allow inline scripts using 'unsafe-inline'
//     res.setHeader(
//       'Content-Security-Policy',
//       "script-src 'self' 'unsafe-inline' 'unsafe-eval';"
//     );
//     return next();
//   });

//   server.all('*', (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });
