import { Hosts, NacosNamingClient } from 'nacos';
import { INacosNamingClientConfig } from '../interface';
import { AbstractServiceDiscovery } from './service-discovery';
/**
 * Nacos 注册服务
 */
export declare class NacosDiscovery extends AbstractServiceDiscovery {
    client: NacosNamingClient;
    _subscribeSet: Set<string>;
    init(opts: INacosNamingClientConfig): Promise<void>;
    destroy(): Promise<void>;
    subscribeCb(hosts: Hosts): void;
    /**
     * 监听服务
     * @param serviceName
     */
    subscribe(serviceName: string): Promise<void>;
    /**
     * 去掉监听
     * @param info
     * @param listener
     */
    unSubscribe(info: string): Promise<void>;
}
