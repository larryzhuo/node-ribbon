"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NacosDiscovery = void 0;
const nacos_1 = require("nacos");
const service_discovery_1 = require("./service-discovery");
const log_1 = __importDefault(require("../log/log"));
/**
 * Nacos 注册服务
 */
class NacosDiscovery extends service_discovery_1.AbstractServiceDiscovery {
    constructor(opts) {
        super();
        this._subscribeSet = new Set();
        // 连接
        this.init(opts);
    }
    async init(opts) {
        this.client = new nacos_1.NacosNamingClient(opts);
        await this.client.ready();
        log_1.default.info(`nacos ready success`);
    }
    async destroy() {
        if (this.client) {
            for (const serviceName of this._subscribeSet) {
                this.client.unSubscribe(serviceName, this.subscribeCb);
            }
        }
    }
    subscribeCb(hosts) {
        this.emit(service_discovery_1.ServerChangeEvent, hosts);
    }
    /**
     * 监听服务
     * @param serviceName
     */
    async subscribe(serviceName) {
        if (!serviceName) {
            throw Error('serviceName can not null');
        }
        if (!this.client) {
            throw Error('client not ready');
        }
        this._subscribeSet.add(serviceName);
        this.client.subscribe(serviceName, this.subscribeCb);
    }
    /**
     * 去掉监听
     * @param info
     * @param listener
     */
    async unSubscribe(info) {
        if (!this.client) {
            throw Error('client not ready');
        }
        this.client.unSubscribe(info, this.subscribeCb);
    }
}
exports.NacosDiscovery = NacosDiscovery;
//# sourceMappingURL=nacos-discovery.js.map