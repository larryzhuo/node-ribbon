const http = require('http');

let port = parseInt(process.argv[2]);
let serverName = process.argv[3];

let app = http.createServer((req, res) => {
  if (req.url?.startsWith('/hello')) {
    res.writeHead(200);
    res.end(`response from ${serverName}`);
  }
});

app.listen(port);
