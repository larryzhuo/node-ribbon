const path = require('path');
const cp = require('child_process');

// create 3 server
for (let i = 7001; i <= 7003; i++) {
  cp.fork(path.resolve(__dirname, './address/simple-server.js'), [i.toString(), `server${i}`], {
    detached: false,
  });
  console.log(`create server:${i}`);
}

// create 3 provider
for (let i = 7004; i <= 7006; i++) {
  cp.fork(path.resolve(__dirname, './nacos/provider.js'), [i.toString(), `server${i}`], {
    detached: false,
  });
  console.log(`create server:${i}`);
}
