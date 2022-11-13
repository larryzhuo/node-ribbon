"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractLoadBalancer = void 0;
class AbstractLoadBalancer {
    constructor() {
        this._servers = [];
    }
    addServer(newServers) {
        this._servers = newServers;
    }
    async getAllServers() {
        return this._servers;
    }
}
exports.AbstractLoadBalancer = AbstractLoadBalancer;
//# sourceMappingURL=abstract-load-balancer.js.map