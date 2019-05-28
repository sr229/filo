export default {
    enabled: true,
    statistics: {
        filesProcessed: 0,
        bytesProcessed: 0,
        bytesSaved: 0
    },
    // disabling these by default due to broken CORS
    disabledHosts: ["stackoverflow.com", "github.com", "katacoda.com"],
    proxyUrl: ""
};
