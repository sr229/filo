/**
 *  @file backend.js
 * @description A simple proxy to handle HTTP/S requirests and proxy them safely.
 * @author Capuccino
 * @license MIT
 */
const rocky = require("rocky");
const proxyServer = rocky({ws: true, 
    proxyTimeout: 5320, 
    autoRewrite: true, 
    xfwd: true, 
    localAddress: true,
    secure: true
});
const dns = require("dns");
const compression = require("compression");
const morgan = require("morgan");
const {Resolver} = dns;
const resolver = new Resolver();
const dnsResolver = resolver.setServers(["1.0.0.1", "1.1.1.1", "9.9.9.9"]);
const port = process.env.PORT || 8321;

// use ExpressJS compression
proxyServer.use(compression());
proxyServer.useForward(compression());
proxyServer.use(morgan("combined"));
proxyServer.use(forwardToTarget("http"));

//Expose all routes
proxyServer.routeAll();

function forwardToTarget(protocol) {
    return function(req, res, next) {
        if (!req.headers.host) return next({message: "Missing host header"});

        // resolve hostnames properly.

        dnsResolver.resolve4(req.headers.host, (err, addresses) => {
            if (err) next({message: `Failed to Resolve ${req.headers.host}.`});
            if (!addresses) next({message: `Failed to resolve IP address for ${req.headers.host}`});

            req.rocky.options.target = `${protocol}://${addresses[0]}`;
            req.rocky.options.secure = false;

            if (!req.rocky.options) next({message: "A internal server error occured"});
        });

        next();
    };
}

proxyServer.listen(port);
console.log(`Listening to ${port}`);