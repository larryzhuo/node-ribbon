"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractServiceDiscovery = exports.ServerChangeEvent = void 0;
const events_1 = require("events");
exports.ServerChangeEvent = 'ServerChangeEvent';
class AbstractServiceDiscovery extends events_1.EventEmitter {
}
exports.AbstractServiceDiscovery = AbstractServiceDiscovery;
//# sourceMappingURL=service-discovery.js.map