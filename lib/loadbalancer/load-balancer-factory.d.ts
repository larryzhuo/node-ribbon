import { ILoadBalancerOption } from '../interface';
import { AbstractLoadBalancer } from './abstract-load-balancer';
export declare class LoadBalancerFactory {
    static getLoadBalancer(opts: ILoadBalancerOption): AbstractLoadBalancer;
}
