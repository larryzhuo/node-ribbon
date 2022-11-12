import { IRibbonOption, IServiceName, Server, ServiceNameTypeEnum } from '../interface';
import RibbonError from '../ribbon-error';
import _ from 'lodash';
import { AbstractServiceDiscovery, ServerChangeEvent } from '../discovery/service-discovery';
import { AbstractLoadBalancer } from '../loadbalancer/abstract-load-balancer';
import { TransportFactory } from '../transport/transport-factory';
import logger from '../log/log';

/**
 * Entry
 */
export class Ribbon {
  serviceName: IServiceName;
  serviceDiscovery: AbstractServiceDiscovery;
  loadBalancer: AbstractLoadBalancer;
  maxAutoRetries: number;
  maxAutoRetriesNextServer: number;

  constructor(options: IRibbonOption) {
    const { serviceName, maxAutoRetries, maxAutoRetriesNextServer } = options; // 一旦实例创建，serviceName 不可修改
    if (!serviceName) {
      throw new RibbonError('serviceName required');
    }

    if (serviceName.type == ServiceNameTypeEnum.Name) {
      if (!_.isString(serviceName)) {
        throw new RibbonError('serviceName format error, should string');
      }
    } else if (serviceName.type == ServiceNameTypeEnum.Address) {
      if (!_.isArray(serviceName)) {
        throw new RibbonError('serviceName format error, should string array');
      }
    } else {
      throw new RibbonError('serviceName format error');
    }
    this.serviceName = serviceName;

    this.maxAutoRetries = maxAutoRetries || 3;
    this.maxAutoRetriesNextServer = maxAutoRetriesNextServer || 3;
  }

  /**
   * set service discovery
   * @param discovery
   */
  withServiceDiscovery(discovery: AbstractServiceDiscovery) {
    if (this.serviceName.type == ServiceNameTypeEnum.Name) {
      // 监听服务变化
      const name = this.serviceName.serviceName as string;
      this.serviceDiscovery.subscribe(name);
      const self = this;
      this.serviceDiscovery.on(ServerChangeEvent, (hosts: Server[]) => {
        if (this.loadBalancer) {
          throw new RibbonError('load balancer required');
        }
        // 添加 server
        self.loadBalancer.addServer(hosts);
      });

      this.serviceDiscovery = discovery;
    } else {
      logger.info('withServiceDiscovery will ignore');
    }
  }

  /**
   * set load balancer
   * @param lb
   */
  withLoadBalancer(lb: AbstractLoadBalancer) {
    this.loadBalancer = lb;
  }

  withMaxAutoRetries(mar: number) {
    this.maxAutoRetries = mar;
  }

  withMaxAutoRetriesNextServer(marns: number) {
    this.maxAutoRetriesNextServer = marns;
  }

  getHttpClient() {
    return TransportFactory.createHttpClient();
  }
}
