"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bypass(req, res, buffer) {
    res.setHeader('x-proxy-bypass', 1);
    res.setHeader('content-length', buffer.length);
    res.status(200);
    res.write(buffer);
    res.end();
}
exports.bypass = bypass;
