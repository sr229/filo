"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shouldCompress(req) {
    const { originType, originSize, webp } = req.params;
    if (!originType.startsWith('image'))
        return false;
    if (parseInt(originSize) === 0)
        return false;
    if (webp && parseInt(originSize) < 1024)
        return false;
    if (!webp && originType.endsWith('png') || originType.endsWith('gif') && parseInt(originSize) < 1024 * 100)
        return false;
    return true;
}
exports.shouldCompress = shouldCompress;
