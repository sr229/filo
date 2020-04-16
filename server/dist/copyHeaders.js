"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function copyHeaders(source, target) {
    for (const [k, v] of Object.entries(source.headers)) {
        try {
            target.setHeader(k, v);
        }
        catch (e) {
            console.error(e.message);
        }
    }
}
exports.copyHeaders = copyHeaders;
