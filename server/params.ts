import express from 'express';

export function params (req: any, res: express.Response, next: express.NextFunction) {
    let url = req.query.url;

    if (Array.isArray(url)) url = url.join('&url=');

    if (!url) return res.end('bandwidth-hero-proxy'); //intentionally returning this to maintain compatibility with bandwidth-hero.

    url = url.replace(/http:\/\/1\.1\.\d\.\d\/bmi\/(https?:\/\/)?/i, 'http://')
    
    // we only support two parameters by default, but we will implement them so it doesn't error out, but they'll get ignored.
    req.params.url = url;
    req.params.webp = true;
    req.params.quality = parseInt(req.query.l, 10) || 80;
    req.params.greyscale = req.query.bw != 0;


    next();
}