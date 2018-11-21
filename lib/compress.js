const sharp = require("sharp");
const redirect = require("./redirect");

module.exports = function(req, res, input) {
    const format = "webp" || "jpeg";

    sharp(input)
        .grayscale(false)
        .toFormat(format, {
            quality: 10,
            progressive: true,
            optimizeScans: true
        })
        .toBuffer((err, output, info) => {
            if (err || !info || res.headersSent) return redirect(req, res);

            res.setHeader("content-type", `image/${format}`);
            res.setHeader("content-length", info.size);
            res.setHeader("x-original-size", req.params.originSize);
            res.setHeader("x-bytes-saved", req.params.originSize - info.size);
            res.status(200);
            res.write(output);
            res.end();
        });
};