const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log('Request received for: ', req.url);

  let filePath = '.' + req.url;
  if (filePath == './') {
    filePath = './index.html'; // Default file (index.html)
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';

  if (extname == '.js') {
    contentType = 'application/javascript';
  } else if (extname == '.css') {
    contentType = 'text/css';
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Sorry, there was an error!');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(8000, () => {
  console.log('Server berjalan di port 8000');
});
