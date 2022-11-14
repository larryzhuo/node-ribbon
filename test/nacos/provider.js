const nacos = require('nacos');
const http = require('http');

const logger = console;

const port = parseInt(process.argv[2]);
const serverName = process.argv[3];

(async function () {
  const client = new nacos.NacosNamingClient({
    logger,
    serverList: '127.0.0.1:8849',
    namespace: 'public',
  });

  await client.registerInstance('provider', {
    ip: '127.0.0.1',
    port,
  });

  // create server
  const app = http.createServer((req, res) => {
    if (req.url?.startsWith('/hello')) {
      res.writeHead(200);
      res.end(`response from ${serverName}`);
    }
  });

  app.listen(port);
})();
