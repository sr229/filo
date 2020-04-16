"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const headerBlacklist = ['cache-control', 'expires', 'date', 'etag'];
function redirect(req, res) {
    if (res.headersSent)
        return;
    res.setHeader('content-length', 0);
    headerBlacklist.forEach(header => {
        res.removeHeader(header);
    });
    res.setHeader('location', encodeURI(req.params.url));
    res.status(302).end;
}
exports.redirect = redirect;
