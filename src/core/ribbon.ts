import {
  IGetHttpClientOption,
  IRibbonOption,
  IService,
  Server,
  ServiceNameTypeEnum,
} from '../interface';
import RibbonError from '../ribbon-error';
import _ from 'lodash';
import { AbstractServiceDiscovery, ServerChangeEvent } from '../discovery/service-discovery';
import { AbstractLoadBalancer } from '../loadbalancer/abstract-load-balancer';
import { TransportFactory } from '../transport/transport-factory';
import logger from '../log/log';
import { formatAddress } from './util';
import { Axios } from 'axios';

/**
 * Entry
 */
export class Ribbon {
  service: IService;
  serviceName: string | string[];
  serviceDiscovery: AbstractServiceDiscovery;
  loadBalancer: AbstractLoadBalancer;
  maxAutoRetries: number;
  maxAutoRetriesNextServer: number;

  constructor(options: IRibbonOption) {
    const { service, maxAutoRetries, maxAutoRetriesNextServer } = options; // 一旦实例创建，serviceName 不可修改
    if (!service) {
      throw new RibbonError('service required');
    }

    if (service.type == ServiceNameTypeEnum.Name) {
      if (!_.isString(service.serviceName)) {
        throw new RibbonError('serviceName format error, should string');
      }
    } else if (service.type == ServiceNameTypeEnum.Address) {
      if (!_.isArray(service.serviceName)) {
        throw new RibbonError('serviceName format error, should string array');
      }
    } else {
      throw new RibbonError('serviceName format error');
    }
    this.service = service;
    this.serviceName = service.serviceName;

    this.maxAutoRetries = maxAutoRetries || 3;
    this.maxAutoRetriesNextServer = maxAutoRetriesNextServer || 3;
  }

  /**
   * set service discovery
   * @param discovery
   */
  withServiceDiscovery(discovery: AbstractServiceDiscovery) {
    if (this.service.type == ServiceNameTypeEnum.Name) {
      // 监听服务变化
      const name = this.service.serviceName as string;
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

    if (this.service.type == ServiceNameTypeEnum.Address) {
      // 指定了 server ip
      const servers: Server[] = [];
      for (const sn of this.service.serviceName) {
        const server: Server = formatAddress(sn);
        servers.push(server);
      }
      this.loadBalancer.addServer(servers);
    }
  }

  withMaxAutoRetries(mar: number) {
    this.maxAutoRetries = mar;
  }

  withMaxAutoRetriesNextServer(marns: number) {
    this.maxAutoRetriesNextServer = marns;
  }

  /**
   * create http client
   * @param opts
   * @returns
   */
  async getHttpClient(opts: IGetHttpClientOption = {}): Promise<Axios> {
    if (!this.loadBalancer) {
      throw new RibbonError('load balancer required');
    }
    const axios = TransportFactory.createHttpClient(opts);

    // interceptor set baseurl
    axios.interceptors.request.use(async (config) => {
      const server = await this.loadBalancer.chooseServer({});
      config.baseURL = `http://${server.ip}:${server.port}`;
      return config;
    });

    // interceptor fallback
    axios.interceptors.response.use(
      async (res) => {
        return res;
      },
      (err) => {
        opts.fallback && opts.fallback(err);
      },
    );
    return axios;
  }
}
