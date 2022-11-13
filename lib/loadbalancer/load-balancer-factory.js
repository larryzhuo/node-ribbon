"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadBalancerFactory = void 0;
const interface_1 = require("../interface");
const random_lb_1 = require("./random-lb");
const round_robin_lb_1 = require("./round-robin-lb");
class LoadBalancerFactory {
    static getLoadBalancer(opts) {
        const { type } = opts;
        switch (type) {
            case interface_1.LoadBalancerEnum.RoundRobin:
                return new round_robin_lb_1.RoundRobinLB();
            default:
                return new random_lb_1.RandomLB(); // default
        }
    }
}
exports.LoadBalancerFactory = LoadBalancerFactory;
//# sourceMappingURL=load-balancer-factory.js.map