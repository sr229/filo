/**
 *  @file index.js
 * @description A simple proxy to handle HTTP/S requirests and proxy them safely.
 * @author Capuccino
 * @license MIT
 */

const httpProxy = require("http-proxy");
const https = require("https");
const request = require("request");
const url = require("url");
const bypass = require("./lib/bypass");
const compress = require("./lib/compress");
const redirect = require("./lib/redirect");
const copyHeaders = require("./lib/copyHeaders");
const shouldCompress = require("./lib/shouldCompress");
const pick = require("lodash").pick;
const proxy = httpProxy.createServer({
    changeOrigin: true,
    toProxy: true,
    preserveHeaderKeyCase: true
});


const proxyServer = https.createServer((req, res) => {
    let urlParsed =  url.parse(req.url);
    let ImageRegex = str => /\/[a-zA-Z0-9]+.(png|jpg)/gi.test(str);
    let pickedHeaders = pick(req.headers, ["cookie", "dnt", "referrer"]);
    // we only pass a second proxy to media URLs, that way we can emulate
    // Google's Data Saver image compression feature.
    if (ImageRegex(urlParsed.pathname)) request.get(req.url, {
        headers: {
            pickedHeaders,
            "User-Agent": "Kappy-Proxy/1.0",
            "X-Forwarded-For": req.headers["x-forwarded-for"] || req.ip,
            via: "1.0 kappy-proxy"
        },
        timeout: 1000,
        maxRedirects: 5,
        encoding: null,
        strictSSL: true,
        gzip: true,
        jar: true
    }, (err, origin, buffer) => {
        if (err || origin.statusCode >= 400) return redirect(req, res);

        copyHeaders(origin, res);
        res.setHeader("Content-Encoding", "Identity");
        req.params.originType = origin.headers["content-type"] || "";
        req.params.originSize = buffer.length;

        if (shouldCompress(req)) compress(req, res, buffer);
        else bypass(req, res, buffer);
    });
    proxy.web(req, res, {target: req.url, secure: false});
});

// Handle WebSocket proxying
proxyServer.on("upgrade", (req, socket, head) => {
    proxy.ws(req, socket, head);
});

proxyServer.on("error", res => {
    res.writeHead(500, {"Content-Type": "text/plain"});
    res.end("Failed to proxy this webpage.\n Report to https://github.com/sr229/kappy-proxy if this persists.");
});

console.log("Server initiated.");
proxyServer.listen(process.env.PORT || 8213);