import { Hosts, NacosNamingClient } from 'nacos';
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

  async init(opts: INacosNamingClientConfig): Promise<void> {
    this.client = new NacosNamingClient(opts);
    await this.client.ready();
    logger.info(`nacos ready success`);
  }

  async destroy(): Promise<void> {
    if (this.client) {
      this.client.unSubscribe();
    }
  }

  subscribeCb(hosts: Hosts) {
    this.emit(this.ServerChangeEvent, hosts);
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
    this.client.subscribe(serviceName, this.subscribeCb);
  }
}

let ins: AbstractServiceDiscovery;

export function getIns(opts: INacosNamingClientConfig): AbstractServiceDiscovery {
  if (!ins) {
    ins = new NacosDiscovery(opts);
  }
  return ins;
}
