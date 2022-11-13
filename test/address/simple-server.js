const http = require('http');

const port = parseInt(process.argv[2]);
const serverName = process.argv[3];

const app = http.createServer((req, res) => {
  if (req.url?.startsWith('/hello')) {
    res.writeHead(200);
    res.end(`response from ${serverName}`);
  }
});

app.listen(port);
