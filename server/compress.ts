import express from 'express';
import sharp from 'sharp';
import {redirect} from './redirect';

/**
 * Compresses static media (image mostly) to WebP equivalent
 * @param req Request Object
 * @param res Response Object
 * @param input Input buffer - usually the image itself
 */
export function compress(req: any, res: express.Response, input: any) {

    // whatever happens, we ignore Bandwidth Hero's settings and just spew out WebP.
    // we're doing this because we want to maintain compatibility with the project we derive in
    const format = 'webp';

    sharp(input).toFormat(format, { quality: req.params.quality, progressive: true, optimiseScans: true })
                .toBuffer((e, o ,i) => {
                    if (e || !i || res.headersSent) return redirect(req, res);

                    res.setHeader('content-type', `image/${format}`);
                    res.setHeader('content-length', i.size);
                    res.setHeader('x-original-size', req.params.originSize);
                    res.setHeader('x-bytes-saved', req.params.originSize - i.size);
                    res.status(200);
                    res.write(o);
                    res.end();
                })
}