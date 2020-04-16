/**
 * Checks if media should be compressed.
 * @param req the media to compress.
 */
export function shouldCompress(req: any) {
    const { origType, origSize, webp } = req.params;

    if(!origType.startsWith('image')) return false;
    if (origSize === 0) return false;
    // 1024 is our minimum compress length
    if (webp && origSize < 1024) return false;

    // 1024 * 100 implies our minimum compress length for transparent assets.
    if (!webp && origType.endsWith('png') || origType.endsWith('gif') && origSize < 1024 * 100) return false 

    return true;
}