import { Server, ChooseServerOption } from '../interface';
import { AbstractLoadBalancer } from './abstract-load-balancer';
/**
 * round-robin choose
 */
export declare class RoundRobinLB extends AbstractLoadBalancer {
    _count: number;
    chooseServer(option: ChooseServerOption): Promise<Server>;
}
