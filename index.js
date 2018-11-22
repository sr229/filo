/**
 *  @file index.js
 * @description A simple proxy to handle HTTP/S requirests and proxy them safely.
 * @author Capuccino
 * @license MIT
 */

const httpProxy = require("http-proxy");
const https = require("https");
const compress = require("compress");
const proxy = httpProxy.createServer({
    changeOrigin: true,
    toProxy: true,
    preserveHeaderKeyCase: true
});

const proxyServer = https.createServer((req, res=compress({level: 7})) => {
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