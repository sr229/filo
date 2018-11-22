/**
 *  @file backend.js
 * @description A simple proxy to handle HTTP/S requirests and proxy them safely.
 * @author Capuccino
 * @license MIT
 */
const http = require("http");
const httpProxy = require("http-proxy");
const url = require("url");
const net = require("net");
const proxy = httpProxy.createServer();
const proxyServer = http.createServer((req, res) => {
    console.log(`Recieving Request for ${req.url}`);

    proxy.web(req, res, {target: req.url, ws: true});
});

proxyServer.on("connect", (req, socket) => {
    console.log(`Recieving Reverse Proxy for ${req.url}`);

    const serverURL = url.parse(`https://${req.url}`);
    const srvSocket = net.connect(serverURL.port, serverURL.hostname, () => {
        socket.write(`HTTP/1.1 200 Connection Established\r\nProxy-Agent:Kappy-Proxy/1.0\r\n\r\n`);

        srvSocket.pipe(socket);
        socket.pipe(srvSocket);
    });

    srvSocket.on("error", e => {
        console.error(`Error when fullfilling request: ${e}`);
    });
});

proxyServer.on("upgrade", (req, socket, head) => {
    proxy.ws(req, socket, head, e => {
        throw e;
    });
});

console.log("Backend initiated.");
proxyServer.listen(8213 || process.env.PORT);