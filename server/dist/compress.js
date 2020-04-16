"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const redirect_1 = require("./redirect");
function compress(req, res, input) {
    const format = 'webp';
    sharp_1.default(input).toFormat(format, { quality: req.params.quality, progressive: true, optimiseScans: true })
        .toBuffer((e, o, i) => {
        if (e || !i || res.headersSent)
            return redirect_1.redirect(req, res);
        res.setHeader('content-type', `image/${format}`);
        res.setHeader('content-length', i.size);
        res.setHeader('x-original-size', req.params.originSize);
        res.setHeader('x-bytes-saved', req.params.originSize - i.size);
        res.status(200);
        res.write(o);
        res.end();
    });
}
exports.compress = compress;
