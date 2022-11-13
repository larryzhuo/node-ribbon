"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadBalancerEnum = exports.ServiceNameTypeEnum = exports.ServiceDiscoveryTypeEnum = void 0;
/**
 * service discovery config
 */
var ServiceDiscoveryTypeEnum;
(function (ServiceDiscoveryTypeEnum) {
    ServiceDiscoveryTypeEnum["Nacos"] = "nacos";
})(ServiceDiscoveryTypeEnum = exports.ServiceDiscoveryTypeEnum || (exports.ServiceDiscoveryTypeEnum = {}));
/**
 * 目标服务
 */
var ServiceNameTypeEnum;
(function (ServiceNameTypeEnum) {
    // service name
    ServiceNameTypeEnum["Name"] = "name";
    // service addr, ip or domain
    ServiceNameTypeEnum["Address"] = "Address";
})(ServiceNameTypeEnum = exports.ServiceNameTypeEnum || (exports.ServiceNameTypeEnum = {}));
/**
 * load balancer config
 */
var LoadBalancerEnum;
(function (LoadBalancerEnum) {
    LoadBalancerEnum["Random"] = "random";
    LoadBalancerEnum["RoundRobin"] = "RoundRobin";
})(LoadBalancerEnum = exports.LoadBalancerEnum || (exports.LoadBalancerEnum = {}));
//# sourceMappingURL=interface.js.map