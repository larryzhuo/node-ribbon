## Introduce
A Node.js RateLimiter, it's core design based [@nestjs/throttler](https://www.npmjs.com/package/@nestjs/throttler) Commonly used to request throttling. 

It is sufficiently extensible， so you can implement IThrottler interface to redefine you strategy (now support a simple RawThrottler) and you can implement IStorage interface to redefine your storage (now support memory and redis). 

## 介绍
这是一个 Node.js 实现的限流器 ，它的核心设计基于[@nestjs/throttler](https://www.npmjs.com/package/@nestjs/throttler)， 一般用于 web 请求中限流。 它拥有足够的扩展性，你能够实现 IThrottler 接口来重新定义策略， 也能够实现 IStorage 接口重新定义存储方式（目前存储方式支持内存和redis）

### Install

> npm i node-throttler

### API

#### 1. throttle constructor
```typescript
const throttler = new RawThrottler({
  limit: number, //The amount of requests that are allowed within the ttl's time window.
  ttl: number,  //The amount of seconds of how many requests are allowed within this time. (seconds)
  storage?: IThrottlerStorageOption;  //The storage class to use where all the record will be stored in.
});
```

#### 2. tryAcquire
```typescript
tryAcquire: (option: IAcquireOption) => Promise<boolean>; //acquire token; if reach limit, return false; else if not reach limit, return true;
```

#### 3. destory
```typescript
tryAcquire: (option: IAcquireOption) => Promise<boolean>; //destory throttler instance
```


### Example

#### Memory Storage Demo
```typescript

async function sleep(time) {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

//main function
async function main() {

  //create a throttler, storage in memory
  const throttler = new RawThrottler({
    limit: 3,
    ttl: 5,
    storage: {
      type: StorageTypeEnum.memory,
    },
  });

  const option: IAcquireOption = { key: 'test-key' };
  const ret: boolean[] = [];
  for (let i = 0, ilen = 5; i < ilen; i++) {
    //user tryAcquire to getToken
    ret.push(await throttler.tryAcquire(option));
  }
  // ret should be [true, true, true, false, false]

  await sleep(5000);

  const nextRet: boolean[] = [];
  for (let i = 0, ilen = 2; i < ilen; i++) {
    nextRet.push(await throttler.tryAcquire(option));
  }
  // nextRet should be [true, true]
}
```

#### Redis Storage Demo
```typescript

async function sleep(time) {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

//main function
async function main() {

  //create a throttler, storage in redis
  const throttler = new RawThrottler({
    limit: 3,
    ttl: 5,
    storage: {
      type: StorageTypeEnum.redis,
      options: {
        host: '127.0.0.1',
        port: 6379,
        db: 0,
        password: '',
      },
    },
  });

  const option: IAcquireOption = { key: 'test-key' };
  const ret: boolean[] = [];
  for (let i = 0, ilen = 5; i < ilen; i++) {
    //user tryAcquire to getToken
    ret.push(await throttler.tryAcquire(option));
  }
  // ret should be [true, true, true, false, false]

  await sleep(5000);

  const nextRet: boolean[] = [];
  for (let i = 0, ilen = 2; i < ilen; i++) {
    nextRet.push(await throttler.tryAcquire(option));
  }
  // nextRet should be [true, true]
}
```
