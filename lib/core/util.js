"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAddress = void 0;
const ribbon_error_1 = __importDefault(require("../ribbon-error"));
/**
 * 从 '192.168.1.1:7001' 中提取信息
 * @param addr
 * @returns
 */
function formatAddress(addr) {
    if (!addr) {
        throw new ribbon_error_1.default('addr format error');
    }
    addr = addr.trim();
    let kvs = addr.split(':');
    let server = {
        ip: kvs[0],
        port: parseInt(kvs[1]),
    };
    return server;
}
exports.formatAddress = formatAddress;
//# sourceMappingURL=util.js.map