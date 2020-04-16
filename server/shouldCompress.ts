import express from 'express';

/**
 * Checks if media should be compressed.
 * @param req the media to compress.
 */
export function shouldCompress(req: express.Request) {
    const { originType, originSize, webp } = req.params;

    if(!originType.startsWith('image')) return false;
    if (parseInt(originSize) === 0) return false;
    // 1024 is our minimum compress length
    if (webp && parseInt(originSize) < 1024) return false;

    // 1024 * 100 implies our minimum compress length for transparent assets.
    if (!webp && originType.endsWith('png') || originType.endsWith('gif') && parseInt(originSize) < 1024 * 100) return false 

    return true;
}