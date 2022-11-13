import { AxiosRequestConfig } from 'axios';

/**
 * service discovery config
 */
export enum ServiceDiscoveryTypeEnum {
  Nacos = 'nacos',
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
  option: INacosNamingClientConfig;
}

/**
 * 目标服务
 */
export enum ServiceNameTypeEnum {
  // service name
  Name = 'name',
  // service addr, ip or domain
  Address = 'Address',
}

export interface IService {
  type: ServiceNameTypeEnum;
  serviceName: string | string[]; // 一个ribbon对应一个serviceName eg: 'shop-provider';  活着多个写明的地址 eg: ['192.168.1.19:7001', '192.168.1.20:7002']
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
  service: IService;

  /**
   * 当前实例最大重试次数
   */
  maxAutoRetries?: number;

  /**
   * 更换实例的最大次数
   */
  maxAutoRetriesNextServer?: number;
}

// Server Info
export interface Server {
  ip: string;
  port: number;
  weight?: number;
  ephemeral?: boolean;
  clusterName?: string;
}

export interface ChooseServerOption {}

export interface IGetHttpClientOption extends AxiosRequestConfig {
  fallback?: (err: any) => void;
}
