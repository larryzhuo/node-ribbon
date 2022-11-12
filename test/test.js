const { EventEmitter } = require('stream');

class C1 extends EventEmitter {
  constructor() {
    super();

    setInterval(() => {
      this.emit('hello', { val: 'world' });
    }, 1000);
  }
}

class C2 {
  name;
  constructor() {
    this.name = 'name';
  }

  start() {
    const c = new C1();
    c.on('hello', function (val) {
      console.log(val, '=====', this.name);
    });
  }
}

new C2().start();
