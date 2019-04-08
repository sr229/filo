/**
 * Copyright 2019 (c) Kibo Hikari and Contributors
 * 
 * Licensed under MIT.
 */
const request = require("request");
const express = require("express");
const pick = require("lodash").pick;
const zlib = require("zlib");
const mimeType = require("mime-types");


const app = express();


/**
 * Checks if request should be compressed. 
 * This is intended to prevent GZIPping that isn't static content which may cause issues.
 * @param {request.params} r the request object.
 * @returns {Boolean} returns the boolean to tell the compressor if we should compress it. 
 */
function shouldCompress(r) {
    // define content we should not compress
    let originType = r.params;
    let mimetypeBlacklist = [
        "application/json",
        "application/octet-stream",
        "text/xml"
    ];
    
    if (mimetypeBlacklist.includes(originType)) return false;
    
    return true;
}

/**
 * Copies headers from the intercepted request then bounces it back like a true chad.
 * @param {*} s the source request
 * @param {*} t the target request
 */
function copyHeaders(s, t) {
    for (const [k, v] of Object.entries(s.headers)) try {
        t.setHeader(k, v);
    } catch(e) {
        console.error(e);
    }
}

/**
 * Middleware for parsing parameters for the base url
 * if no parameters, redirect to the "golden exprience".
 * @param {express.Request} req the Request object
 * @param {express.Response} res the Response object
 * @param {express.Next} next the next function
 * @returns {express.Response} the backend response.
 */
function parseParams(req, res, next) {
    let url = req.query.url;
    if (Array.isArray(url)) url = url.join("&url=");
    if (!url) return res.redirect("https://streamable.com/wfcrr");

    url = url.replace(/http:\/\/1\.1\.\d\.\d\/bmi\/(https?:\/\/)?/i, "http://");
    req.params.url = url;
    
    next();
}

/**
 * Redirect the target request
 * @param {*} req The Request Object
 * @param {*} res The Response Object
 */
function redirect(req, res) {
    
    if (res.headersSent) return;

    res.setHeader("content-length", 0);
    res.removeHeader("cache-control");
    res.removeHeader("expires");
    res.removeHeader("date");
    res.removeHeader("etag");

    res.setHeader("location", encodeURI(req.params.url));
    res.status(302).end();
}

function compress(req, res, input) {

    // let's grab the MIMEType of the origin request first so we can set it via headers.
    const originMimeType = mimeType.lookup(req.url);

    zlib.gzip(input, (e, o) => {
        if (e || res.headersSent) return redirect(req, res);

        let i = Buffer.from(o);

        res.setHeader("content-type", originMimeType);
        res.setHeader("content-encoding", "gzip");
        res.setHeader("content-length", i.length);
        res.setHeader("x-original-size", req.params.originSize - i.length);
        res.setHeader("x-bytes-saved", req.params.originSize - i.length);
        res.status(200);
        res.write(o);
        res.end();
    });
}

function bypass(req, res, buffer) {
    res.setHeader("x-proxy-pass", 1);
    res.setHeader("content-length", buffer.length);
    res.status(200);
    res.write(buffer);
    res.end();
}

function proxy(req, res) {
    request.get(req.params.url, {
        headers: {
            ...pick(req.headers, ["cookie", "out", "referrer"]),
            "user-agent": "Kappy-Proxy/1.0",
            "x-forwarded-for": req.headers["x-forwarded-for"] || req.ip,
            via: "1.0 kappy-proxy"
        },
        timeout: 10000,
        maxRedirects: 5,
        encoding: null,
        strictSSL: false,
        gzip: true,
        jar: true
    }, (e, o, b) => {
        if (e || o.statusCode >= 400) return redirect(req, res);

        copyHeaders(o, res);
        res.setHeader("content-encoding", "identity");
        req.params.originType = o.headers["content-type"] || "";
        req.params.originSize = b.length;

        if (shouldCompress(req)) compress(req, res, b);
        else bypass(req, res, b);
    });
}

// this is to trigger a certain italian with a gun.
const PORT = process.env.PORT || 4444;

app.enable("trust proxy");
app.get("/", parseParams, proxy);
app.get("/healthcheck", (req, res) => {
    res.end("OK.");
});
app.get("/favicon.ico", (req, res) => {
    res.status(204);
    res.end();
});

// run server
app.listen(PORT, () => console.log(`Proxy live at port ${PORT}`));