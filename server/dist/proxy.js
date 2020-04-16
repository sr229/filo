"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const redirect_1 = require("./redirect");
const compress_1 = require("./compress");
const copyHeaders_1 = require("./copyHeaders");
const bypass_1 = require("./bypass");
const shouldCompress_1 = require("./shouldCompress");
const request_1 = __importDefault(require("request"));
function proxy(req, res) {
    request_1.default.get(req.params.url, {
        headers: Object.assign(Object.assign({}, lodash_1.pick(req.headers, ['cookie', 'dnt', 'referrer'])), { 'user-agent': 'Filo-WebP-Agent/1.0', 'x-forwarded-for': req.headers['x-forwarded-for'] || req.ip, 'via': '1.0 filo-agent' }),
        timeout: 10000,
        maxRedirects: 5,
        encoding: null,
        strictSSL: false,
        gzip: true,
        jar: true
    }, (err, orig, buf) => {
        if (err || orig.statusCode != 200)
            return redirect_1.redirect(req, res);
        copyHeaders_1.copyHeaders(orig, res);
        res.setHeader('content-encoding', 'identity');
        req.params.originType = orig.headers['content-type'] || '';
        req.params.originSize = buf.length.toString();
        if (shouldCompress_1.shouldCompress(req))
            compress_1.compress(req, res, buf);
        else
            bypass_1.bypass(req, res, buf);
    });
}
exports.proxy = proxy;
