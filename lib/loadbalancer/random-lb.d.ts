import { ChooseServerOption, Server } from '../interface';
import { AbstractLoadBalancer } from './abstract-load-balancer';
/**
 * random choose
 */
export declare class RandomLB extends AbstractLoadBalancer {
    chooseServer(option: ChooseServerOption): Promise<Server>;
}
