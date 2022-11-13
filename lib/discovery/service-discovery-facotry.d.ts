import { IServiceDiscoveryOption } from '../interface';
import { AbstractServiceDiscovery } from './service-discovery';
export declare class ServiceDiscoveryFactory {
    /**
     * create discovery
     * @param option
     */
    static createDiscovery(opts: IServiceDiscoveryOption): AbstractServiceDiscovery;
}
