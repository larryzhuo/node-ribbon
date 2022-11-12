import { ILoadBalancerOption, LoadBalancerEnum } from '../interface';
import { AbstractLoadBalancer } from './abstract-load-balancer';
import { RandomLB } from './random-lb';
import { RoundRobinLB } from './round-robin-lb';

export class LoadBalancerFactory {
  static getLoadBalancer(opts: ILoadBalancerOption): AbstractLoadBalancer {
    const { type } = opts;

    switch (type) {
      case LoadBalancerEnum.RoundRobin:
        return new RoundRobinLB();
      default:
        return new RandomLB(); // default
    }
  }
}
