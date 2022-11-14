import { Hosts, NacosNamingClient } from 'nacos';
import { INacosNamingClientConfig } from '../interface';
import { AbstractServiceDiscovery, ServerChangeEvent } from './service-discovery';
import logger from '../log/log';

/**
 * Nacos 注册服务
 */
export class NacosDiscovery extends AbstractServiceDiscovery {
  client: NacosNamingClient;
  _subscribeSet: Set<string> = new Set();

  async init(opts: INacosNamingClientConfig): Promise<void> {
    this.client = new NacosNamingClient(opts);
    await this.client.ready();
    logger.info(`nacos ready success`);
  }

  async destroy(): Promise<void> {
    if (this.client) {
      for (const serviceName of this._subscribeSet) {
        this.client.unSubscribe(serviceName, this.subscribeCb.bind(this));
      }
    }
  }

  subscribeCb(hosts: Hosts) {
    this.emit(ServerChangeEvent, hosts);
  }

  /**
   * 监听服务
   * @param serviceName
   */
  async subscribe(serviceName: string): Promise<void> {
    if (!serviceName) {
      throw Error('serviceName can not null');
    }
    if (!this.client) {
      throw Error('client not ready');
    }
    this._subscribeSet.add(serviceName);
    this.client.subscribe(serviceName, this.subscribeCb.bind(this));
  }

  /**
   * 去掉监听
   * @param info
   * @param listener
   */
  async unSubscribe(info: string): Promise<void> {
    if (!this.client) {
      throw Error('client not ready');
    }
    this.client.unSubscribe(info, this.subscribeCb);
  }
}
