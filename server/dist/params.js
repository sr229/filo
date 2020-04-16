"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function params(req, res, next) {
    let url = req.query.url;
    if (Array.isArray(url))
        url = url.join('&url=');
    if (!url)
        return res.end('bandwidth-hero-proxy');
    url = url.replace(/http:\/\/1\.1\.\d\.\d\/bmi\/(https?:\/\/)?/i, 'http://');
    req.params.url = url;
    req.params.webp = true;
    req.params.quality = parseInt(req.query.l, 10) || 80;
    req.params.greyscale = req.query.bw != 0;
    next();
}
exports.params = params;
