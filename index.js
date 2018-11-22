/**
 *  @file index.js
 * @description A simple proxy to handle HTTP/S requirests and proxy them safely.
 * @author Capuccino
 * @license MIT
 */

const httpProxy = require("http-proxy");
const https = require("https");
const app = require("connect")();
const compression = require("compression");
const proxy = httpProxy.createServer({
    changeOrigin: true,
    toProxy: true,
    preserveHeaderKeyCase: true
});

// Use ExpressJS compression that uses zlib
// I mean yo dawg I heard you like compression
// So I compress your compression while compressing
// your compression

app.use(compression());
app.use((req, res) => {proxy.web(req, res, {target: req.url, secure: false})});

const proxyServer = https.createServer(app);

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