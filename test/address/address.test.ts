import { LoadBalancerFactory, RibbonBuilder } from '../../lib/index';
import { LoadBalancerEnum, ServiceNameTypeEnum } from '../../lib/interface';

jest.setTimeout(60 * 1000);

beforeAll(() => {});

afterAll(() => {});

describe('address list', () => {
  /**
   * test random req
   */
  test('test random req', async () => {
    // start req
    const lbIns = LoadBalancerFactory.getLoadBalancer({ type: LoadBalancerEnum.Random });

    const ribbonIns = new RibbonBuilder({
      service: {
        type: ServiceNameTypeEnum.Address,
        serviceName: ['127.0.0.1:7001', '127.0.0.1:7002', '127.0.0.1:7003'],
      },
    })
      .withLoadBalancer(lbIns)
      .build();
    await ribbonIns.setup();

    const httpClient = await ribbonIns.getHttpClient({
      fallback: (err) => {
        console.log('req err:', err);
      },
    });

    try {
      for (let i = 0, ilen = 10; i < ilen; i++) {
        const ret = await httpClient.get('/hello');
        console.log('random ret:', ret.data);
        expect(ret.status).toBe(200);
      }
    } catch (e) {
      console.error(e);
    }
  });

  /**
   * test round robin req
   */
  test('test roundrobin req', async () => {
    // start req
    const lbIns = LoadBalancerFactory.getLoadBalancer({ type: LoadBalancerEnum.RoundRobin });

    const ribbonIns = new RibbonBuilder({
      service: {
        type: ServiceNameTypeEnum.Address,
        serviceName: ['127.0.0.1:7001', '127.0.0.1:7002', '127.0.0.1:7003'],
      },
    })
      .withLoadBalancer(lbIns)
      .build();
    await ribbonIns.setup();

    const httpClient = await ribbonIns.getHttpClient({
      fallback: (err) => {
        console.log('req err:', err);
      },
    });

    try {
      for (let i = 0, ilen = 10; i < ilen; i++) {
        const ret = await httpClient.get('/hello');
        console.log('rr ret:', ret.data);
        expect(ret.status).toBe(200);
      }
    } catch (e) {
      console.error(e);
    }
  });
});
