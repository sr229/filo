import express from 'express';

/**
 * Bypass the request, because we can't compress it or something happened.
 * @param req Request  Object
 * @param res Response Object
 * @param buffer Buffer of the file
 */
export function bypass(req: express.Request, res: express.Response, buffer: Buffer) {
    res.setHeader('x-proxy-bypass', 1);
    res.setHeader('content-length', buffer.length);
    res.status(200);
    res.write(buffer);
    res.end();
}