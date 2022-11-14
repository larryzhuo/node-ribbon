"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RibbonError extends Error {
    constructor(msg) {
        super(`[node-ribbon] ${msg}`);
    }
}
exports.default = RibbonError;
//# sourceMappingURL=ribbon-error.js.map