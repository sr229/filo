import express from 'express';

/**
 * Copies the Headers to the target request
 * @param source the source request
 * @param target the target request
 */
export function copyHeaders(source: express.Request, target: express.Response) {

    for (const [k, v] of Object.entries(source.headers)) {
        try {
            target.setHeader(k, v);
        } catch (e) {
            console.error(e.message);
        }
    }
}
