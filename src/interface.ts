import { NacosNamingClient } from 'nacos';

/**
 * service discovery config
 */
export enum ServiceDiscoveryTypeEnum {
  Nacos = 'nacos',
  Address = 'address', //直接传入一个或者一批地址
}

export interface INacosNamingClientConfig {
  logger: typeof console;
  serverList: string | string[];
  namespace?: string;
}

export interface IAddressConfig {
  serverList: string | string[];
}

export interface IServiceDiscoveryOption {
  type: ServiceDiscoveryTypeEnum;
  option: INacosNamingClientConfig | IAddressConfig;
}

/**
 * load balancer config
 */
export enum LoadBalancerEnum {
  Random = 'random',
  RoundRobin = 'RoundRobin',
}
export interface ILoadBalancerOption {
  type: LoadBalancerEnum;
}

/**
 * ribbon config
 */
export interface IRibbonOption {
  serviceDiscovery: IServiceDiscoveryOption;
  loadBalancer?: ILoadBalancerOption;

  /**
   * 当前实例最大重试次数
   */
  maxAutoRetries?: number;

  /**
   * 更换实例的最大次数
   */
  maxAutoRetriesNextServer?: number;
}
