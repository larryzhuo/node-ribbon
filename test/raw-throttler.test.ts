import { IAcquireOption, RawThrottler, StorageTypeEnum } from '../src/index';

async function sleep(time) {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

jest.setTimeout(60 * 1000);

describe('raw throttler', () => {
  /**
   * test memory storage
   */
  test('test memory storage', async () => {
    const throttler = new RawThrottler({
      limit: 3,
      ttl: 5,
      storage: {
        type: StorageTypeEnum.memory,
      },
    });

    const option: IAcquireOption = { key: 'test-key' };

    const ret: boolean[] = [];
    for (let i = 0, ilen = 10; i < ilen; i++) {
      ret.push(await throttler.tryAcquire(option));
    }

    await sleep(5000);

    const nextRet: boolean[] = [];
    for (let i = 0, ilen = 2; i < ilen; i++) {
      nextRet.push(await throttler.tryAcquire(option));
    }

    await throttler.destory();

    expect(ret.filter((item) => item === true).length).toBe(3);
    expect(nextRet.filter((item) => item === true).length).toBe(2);

    console.log('memory: ', ret, nextRet);
  });

  /**
   * test redis storage
   */
  test('test redis storage', async () => {
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

    const option: IAcquireOption = { key: 'testkey' };

    const ret: boolean[] = [];
    for (let i = 0, ilen = 10; i < ilen; i++) {
      ret.push(await throttler.tryAcquire(option));
    }

    await sleep(5000);

    const nextRet: boolean[] = [];
    for (let i = 0, ilen = 2; i < ilen; i++) {
      nextRet.push(await throttler.tryAcquire(option));
    }

    await throttler.destory();

    console.log('redis: ', ret, nextRet);

    expect(ret.filter((item) => item === true).length).toBe(3);
    expect(nextRet.filter((item) => item === true).length).toBe(2);
  });
});
