module.exports = function(source, target) {
    for (const [key, value] of Object.entries(source.headers)) {
        try {
            target.setHeader(key, value);
        } catch(e) {
            console.log(e.message);
        }
    }
}; 