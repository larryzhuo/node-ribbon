import { NacosNamingClient } from 'nacos';
import { INacosNamingClientConfig } from '../interface';
import { AbstractServiceDiscovery } from './service-discovery';
import logger from '../log/log';

class NacosDiscovery extends AbstractServiceDiscovery {
  client: NacosNamingClient;

  constructor(opts: INacosNamingClientConfig) {
    super();

    //连接
    this.init(opts);
  }

  async init(opts: INacosNamingClientConfig) {
    this.client = new NacosNamingClient(opts);
    await this.client.ready();
    logger.info(`nacos ready success`);
  }

  /**
   * 监听服务
   * @param serviceName
   */
  async subscribeService(serviceName: string): Promise<void> {
    if (!serviceName) {
      throw Error('serviceName can not null');
    }
    if (!this.client) {
      throw Error('client not ready');
    }
    this.client.subscribe(serviceName, (hosts) => {
      this.emit(this.ServerChangeEvent, hosts);
    });
  }
}

let ins: AbstractServiceDiscovery;

export function getIns(opts: INacosNamingClientConfig): AbstractServiceDiscovery {
  if (!ins) {
    ins = new NacosDiscovery(opts);
  }
  return ins;
}
