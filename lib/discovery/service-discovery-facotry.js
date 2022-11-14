"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceDiscoveryFactory = void 0;
const interface_1 = require("../interface");
const ribbon_error_1 = __importDefault(require("../ribbon-error"));
const nacos_discovery_1 = require("./nacos-discovery");
class ServiceDiscoveryFactory {
    /**
     * create discovery
     * @param option
     */
    static async createDiscovery(opts) {
        const { type, option } = opts;
        if (type == interface_1.ServiceDiscoveryTypeEnum.Nacos) {
            const ins = new nacos_discovery_1.NacosDiscovery(); // nacos 是否单例复用，由上层业务自己决定
            await ins.init(option);
            return ins;
        }
        else {
            throw new ribbon_error_1.default('not support service discovery type');
        }
    }
}
exports.ServiceDiscoveryFactory = ServiceDiscoveryFactory;
//# sourceMappingURL=service-discovery-facotry.js.map