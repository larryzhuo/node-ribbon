import { IGetHttpClientOption, IRibbonOption, IService } from '../interface';
import { AbstractServiceDiscovery } from '../discovery/service-discovery';
import { AbstractLoadBalancer } from '../loadbalancer/abstract-load-balancer';
import { Axios } from 'axios';
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
    constructor(options: IRibbonOption);
    /**
     * set service discovery
     * @param discovery
     */
    withServiceDiscovery(discovery: AbstractServiceDiscovery): void;
    /**
     * set load balancer
     * @param lb
     */
    withLoadBalancer(lb: AbstractLoadBalancer): void;
    withMaxAutoRetries(mar: number): void;
    withMaxAutoRetriesNextServer(marns: number): void;
    /**
     * create http client
     * @param opts
     * @returns
     */
    getHttpClient(opts?: IGetHttpClientOption): Promise<Axios>;
}
