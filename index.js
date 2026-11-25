const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 3003;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');

  if (url.searchParams.has('hello')) {
    const name = url.searchParams.get('hello');

    if (!name || !name.trim()) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Enter a name');
    }

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end(`Hello, ${name}.`);
  }

  if (url.searchParams.has('users') && url.searchParams.size === 1) {
    const users = fs.readFileSync('./data/users.json', 'utf8');

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(users);
  }

  if (url.searchParams.size === 0) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Hello, World!');
  }

  res.writeHead(500);
  res.end();
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
