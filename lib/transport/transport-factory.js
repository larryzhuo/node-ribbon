"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportFactory = void 0;
const axios_1 = __importDefault(require("axios"));
class TransportFactory {
    /**
     * http use axios
     * @param config
     * @returns
     */
    static createHttpClient(config) {
        return axios_1.default.create(config);
    }
    static createTcpClient() { }
}
exports.TransportFactory = TransportFactory;
//# sourceMappingURL=transport-factory.js.map