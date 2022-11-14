import { IServiceDiscoveryOption, ServiceDiscoveryTypeEnum } from '../interface';
import RibbonError from '../ribbon-error';
import { NacosDiscovery } from './nacos-discovery';
import { AbstractServiceDiscovery } from './service-discovery';

export class ServiceDiscoveryFactory {
  /**
   * create discovery
   * @param option
   */
  static async createDiscovery(opts: IServiceDiscoveryOption): Promise<AbstractServiceDiscovery> {
    const { type, option } = opts;
    if (type == ServiceDiscoveryTypeEnum.Nacos) {
      const ins = new NacosDiscovery(); // nacos 是否单例复用，由上层业务自己决定
      await ins.init(option);
      return ins;
    } else {
      throw new RibbonError('not support service discovery type');
    }
  }
}
