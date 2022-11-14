import { AbstractServiceDiscovery } from '../../lib/discovery/service-discovery';
import { LoadBalancerFactory, RibbonBuilder, ServiceDiscoveryFactory } from '../../lib/index';
import {
  LoadBalancerEnum,
  ServiceDiscoveryTypeEnum,
  ServiceNameTypeEnum,
} from '../../lib/interface';

const logger = console;

jest.setTimeout(60 * 1000);

async function sleep(time) {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

let nacosIns: AbstractServiceDiscovery;
beforeAll(async () => {
  nacosIns = await ServiceDiscoveryFactory.createDiscovery({
    type: ServiceDiscoveryTypeEnum.Nacos,
    option: {
      logger,
      serverList: '127.0.0.1:8849',
      namespace: 'public',
    },
  });
});

afterAll(async () => {
  if (nacosIns) {
    await nacosIns.destroy();
  }
});

describe('address list', () => {
  /**
   * test random req
   */
  test('test random req', async () => {
    // start req
    const lbIns = LoadBalancerFactory.getLoadBalancer({ type: LoadBalancerEnum.Random });

    const ribbonIns = new RibbonBuilder({
      service: {
        type: ServiceNameTypeEnum.Name,
        serviceName: 'provider',
      },
    })
      .withLoadBalancer(lbIns)
      .withServiceDiscovery(nacosIns)
      .build();
    await ribbonIns.setup();

    const httpClient = await ribbonIns.getHttpClient({
      fallback: (err) => {
        console.log('req err:', err);
      },
    });
    await sleep(3000);

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
        type: ServiceNameTypeEnum.Name,
        serviceName: 'provider',
      },
    })
      .withLoadBalancer(lbIns)
      .withServiceDiscovery(nacosIns)
      .build();
    await ribbonIns.setup();

    const httpClient = await ribbonIns.getHttpClient({
      fallback: (err) => {
        console.log('req err:', err);
      },
    });
    await sleep(3000);

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
