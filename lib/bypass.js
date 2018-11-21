module.exports = function(req, res, buffer) {
    res.setHeader("x-proxy-bypass", 1);
    res.setHeader("content-length", buffer.length);
    res.status(200);
    res.write(buffer);
    res.end();
};