/**
 *  @file backend.js
 * @description A simple proxy to handle HTTP/S requirests and proxy them safely.
 * @author Capuccino
 * @license MIT
 */
const rocky = require("rocky");
const proxyServer = rocky({ws: true, proxyTimeout: 5320, autoRewrite: true});
const compression = require("compression");
const morgan = require("morgan");
const port = process.env.PORT || 8321;

// use ExpressJS compression
proxyServer.use(compression());
proxyServer.use(morgan("combined"));

//Expose all routes
proxyServer.routeAll();
proxyServer.useForward(forwardToTarget("http"));

function forwardToTarget(protocol) {
    return function(req, res, next) {
        if (!req.headers.host) return next({message: "Missing host header"});
  
        req.rocky.options.target = protocol + "://" + req.headers.host;
        req.rocky.options.secure = false;
  
        next();
    };
}

proxyServer.listen(port, process.env.PROXY_HOSTNAME || "localhost");
console.log(`Listening to ${port}`);