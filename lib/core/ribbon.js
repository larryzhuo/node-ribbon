"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ribbon = void 0;
const interface_1 = require("../interface");
const ribbon_error_1 = __importDefault(require("../ribbon-error"));
const lodash_1 = __importDefault(require("lodash"));
const service_discovery_1 = require("../discovery/service-discovery");
const transport_factory_1 = require("../transport/transport-factory");
const log_1 = __importDefault(require("../log/log"));
const util_1 = require("./util");
/**
 * Entry
 */
class Ribbon {
    constructor(options) {
        const { service, maxAutoRetries, maxAutoRetriesNextServer } = options; // 一旦实例创建，serviceName 不可修改
        if (!service) {
            throw new ribbon_error_1.default('service required');
        }
        if (service.type == interface_1.ServiceNameTypeEnum.Name) {
            if (!lodash_1.default.isString(service.serviceName)) {
                throw new ribbon_error_1.default('serviceName format error, should string');
            }
        }
        else if (service.type == interface_1.ServiceNameTypeEnum.Address) {
            if (!lodash_1.default.isArray(service.serviceName)) {
                throw new ribbon_error_1.default('serviceName format error, should string array');
            }
        }
        else {
            throw new ribbon_error_1.default('serviceName format error');
        }
        this.service = service;
        this.serviceName = service.serviceName;
        this.maxAutoRetries = maxAutoRetries || 3;
        this.maxAutoRetriesNextServer = maxAutoRetriesNextServer || 3;
    }
    /**
     * set service discovery
     * @param discovery
     */
    withServiceDiscovery(discovery) {
        if (this.service.type == interface_1.ServiceNameTypeEnum.Name) {
            // 监听服务变化
            const name = this.service.serviceName;
            this.serviceDiscovery.subscribe(name);
            const self = this;
            this.serviceDiscovery.on(service_discovery_1.ServerChangeEvent, (hosts) => {
                if (this.loadBalancer) {
                    throw new ribbon_error_1.default('load balancer required');
                }
                // 添加 server
                self.loadBalancer.addServer(hosts);
            });
            this.serviceDiscovery = discovery;
        }
        else {
            log_1.default.info('withServiceDiscovery will ignore');
        }
    }
    /**
     * set load balancer
     * @param lb
     */
    withLoadBalancer(lb) {
        this.loadBalancer = lb;
        if (this.service.type == interface_1.ServiceNameTypeEnum.Address) {
            //指定了 server ip
            let servers = [];
            for (let sn of this.service.serviceName) {
                let server = (0, util_1.formatAddress)(sn);
                servers.push(server);
            }
            this.loadBalancer.addServer(servers);
        }
    }
    withMaxAutoRetries(mar) {
        this.maxAutoRetries = mar;
    }
    withMaxAutoRetriesNextServer(marns) {
        this.maxAutoRetriesNextServer = marns;
    }
    /**
     * create http client
     * @param opts
     * @returns
     */
    async getHttpClient(opts = {}) {
        if (!this.loadBalancer) {
            throw new ribbon_error_1.default('load balancer required');
        }
        let axios = transport_factory_1.TransportFactory.createHttpClient(opts);
        //interceptor set baseurl
        axios.interceptors.request.use(async (config) => {
            let server = await this.loadBalancer.chooseServer({});
            config.baseURL = 'http://' + server.ip + ':' + server.port;
            return config;
        });
        //interceptor fallback
        axios.interceptors.response.use(async (res) => {
            return res;
        }, (err) => {
            opts.fallback && opts.fallback(err);
        });
        return axios;
    }
}
exports.Ribbon = Ribbon;
//# sourceMappingURL=ribbon.js.map