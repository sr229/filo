import express from 'express';
import {pick} from 'lodash';
import {redirect} from './redirect';
import {compress} from './compress';
import {copyHeaders} from './copyHeaders';
import {bypass} from './bypass';
import {shouldCompress} from './shouldCompress';
import request from 'request';


export function proxy (req: express.Request, res: express.Response) {
    request.get(req.params.url, {
        headers: {
            ...pick(req.headers, ['cookie', 'dnt', 'referrer']),
            'user-agent': 'Filo-WebP-Agent/1.0',
            'x-forwarded-for': req.headers['x-forwarded-for'] || req.ip,
            'via': '1.0 filo-agent'
        },
        timeout: 10000,
        maxRedirects: 5,
        encoding: null,
        strictSSL: false,
        gzip: true,
        jar: true
    },
     (err: Error, orig: any, buf: Buffer) => {
         if (err || orig.statusCode != 200) return redirect(req, res);

         copyHeaders(orig, res);
         res.setHeader('content-encoding', 'identity');
         req.params.originType = orig.headers['content-type'] || '';
         req.params.originSize = buf.length.toString();

         if (shouldCompress(req)) compress(req, res, buf);
          else bypass(req, res, buf);
     }
    )
}