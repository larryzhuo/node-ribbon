import { IGetHttpClientOption, IRibbonOption, IService } from '../interface';
import { AbstractServiceDiscovery } from '../discovery/service-discovery';
import { AbstractLoadBalancer } from '../loadbalancer/abstract-load-balancer';
import { Axios } from 'axios';
/**
 * builder
 */
export declare class RibbonBuilder {
    service: IService;
    serviceName: string | string[];
    maxAutoRetries: number;
    maxAutoRetriesNextServer: number;
    serviceDiscovery: AbstractServiceDiscovery;
    loadBalancer: AbstractLoadBalancer;
    constructor(options: IRibbonOption);
    withServiceDiscovery(discovery: AbstractServiceDiscovery): RibbonBuilder;
    withLoadBalancer(lb: AbstractLoadBalancer): RibbonBuilder;
    withMaxAutoRetries(mar: number): RibbonBuilder;
    withMaxAutoRetriesNextServer(marns: number): RibbonBuilder;
    build(): Ribbon;
}
/**
 * Entry
 */
export declare class Ribbon {
    service: IService;
    serviceName: string | string[];
    serviceDiscovery: AbstractServiceDiscovery;
    loadBalancer: AbstractLoadBalancer;
    maxAutoRetries: number;
    maxAutoRetriesNextServer: number;
    constructor(builder: RibbonBuilder);
    setup(): Promise<void>;
    /**
     * create http client
     * @param opts
     * @returns
     */
    getHttpClient(opts?: IGetHttpClientOption): Promise<Axios>;
}
