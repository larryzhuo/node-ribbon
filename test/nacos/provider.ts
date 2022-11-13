const nacos = require('nacos');

const logger = console;

(async function () {
  const client = new nacos.NacosNamingClient({
    logger,
    serverList: '127.0.0.1:8848',
    namespace: 'public',
  });
  const serviceName = 'provider';

  await client.registerInstance(serviceName, {
    ip: '1.1.1.1',
    port: 8080,
  });
})();
