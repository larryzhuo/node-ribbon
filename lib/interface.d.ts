import { AxiosRequestConfig } from 'axios';
/**
 * service discovery config
 */
export declare enum ServiceDiscoveryTypeEnum {
    Nacos = "nacos"
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
export declare enum ServiceNameTypeEnum {
    Name = "name",
    Address = "Address"
}
export interface IService {
    type: ServiceNameTypeEnum;
    serviceName: string | string[];
}
/**
 * load balancer config
 */
export declare enum LoadBalancerEnum {
    Random = "random",
    RoundRobin = "RoundRobin"
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
export interface Server {
    ip: string;
    port: number;
    weight?: number;
    ephemeral?: boolean;
    clusterName?: string;
}
export interface ChooseServerOption {
}
export interface IGetHttpClientOption extends AxiosRequestConfig {
    fallback?: (err: any) => void;
}
