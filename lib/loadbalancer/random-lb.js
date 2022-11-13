"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomLB = void 0;
const lodash_1 = __importDefault(require("lodash"));
const log_1 = __importDefault(require("../log/log"));
const ribbon_error_1 = __importDefault(require("../ribbon-error"));
const abstract_load_balancer_1 = require("./abstract-load-balancer");
/**
 * random choose
 */
class RandomLB extends abstract_load_balancer_1.AbstractLoadBalancer {
    async chooseServer(option) {
        log_1.default.info('option, %s', option);
        if (lodash_1.default.isEmpty(this._servers)) {
            throw new ribbon_error_1.default('_servers null');
        }
        const len = this._servers.length;
        const index = Math.floor(Math.random() * len);
        const server = this._servers[index];
        log_1.default.info(`chooseServer %s:%s`, server.ip, server.port);
        return server;
    }
}
exports.RandomLB = RandomLB;
//# sourceMappingURL=random-lb.js.map