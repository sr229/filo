export default (headers, proxyUrl) => { 
    proxyUrl = new URL(proxyUrl) || proxyUrl;
    let proxyHost = proxyUrl.protocol + "//" + proxyUrl.host;
    let isHttp = proxyUrl.protocol === "http:";
    
    return headers.map(header => {
        return /content-security-policy/i.test(header.name)
            ? {
                name: header.name,
                value: stripMixedContentCSP(header.value, isHttp)
                    .replace("img-src", `img-src ${proxyHost}`)
                    .replace("default-src", `default-src ${proxyHost}`)
                    .replace("connect-src", `connect-src ${proxyHost}`)
                    .replace("script-src", `script-src ${proxyHost}`)
                    .replace("style-src", `style-src ${proxyHost}`)
                    .replace("font-src", `font-src ${proxyHost}`)
                    .replace("worker-src", `worker-src ${proxyHost}`)
            }
            : header;
    });
};

function stripMixedContentCSP(CSPHeader, isHttp) {
    return isHttp ? 
        CSPHeader.replace("block-all-mixed-content", "") : 
        CSPHeader;
}
