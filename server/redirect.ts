import express from 'express';
const headerBlacklist = [ 'cache-control', 'expires', 'date', 'etag' ];

/**
 * Redirect Request and remove the headers
 * @param {express.Request} req the Request Object. 
 * @param {express.Response} res the Response Object.
 */
export function redirect (req: express.Request, res: express.Response) {
    if (res.headersSent) return;

    res.setHeader('content-length', 0);
    // instead of a usual line of res.removeHeader, we just ban all the headers we don't want in a array.
    headerBlacklist.forEach(header => {
        res.removeHeader(header);
    })
    res.setHeader('location', encodeURI(req.params.url));
    res.status(302).end;
}
