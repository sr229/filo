/**
 * Data Compression Proxy Extension for Google Chrome on Desktop
 * (c) 2014 Jerzy Głowacki. License: Apache 2.0
 */

var MD5 = function(e) {
	function h(a,b){var c,d,e,f,g;e=a&2147483648;f=b&2147483648;c=a&1073741824;d=b&1073741824;g=(a&1073741823)+(b&1073741823);return c&d?g^2147483648^e^f:c|d?g&1073741824?g^3221225472^e^f:g^1073741824^e^f:g^e^f}function k(a,b,c,d,e,f,g){a=h(a,h(h(b&c|~b&d,e),g));return h(a<<f|a>>>32-f,b)}function l(a,b,c,d,e,f,g){a=h(a,h(h(b&d|c&~d,e),g));return h(a<<f|a>>>32-f,b)}function m(a,b,d,c,e,f,g){a=h(a,h(h(b^d^c,e),g));return h(a<<f|a>>>32-f,b)}function n(a,b,d,c,e,f,g){a=h(a,h(h(d^(b|~c),e),g));return h(a<<f|a>>>32-f,b)}function p(a){var b="",d="",c;for(c=0;3>=c;c++)d=a>>>8*c&255,d="0"+d.toString(16),b+=d.substr(d.length-2,2);return b}var f=[],q,r,s,t,a,b,c,d;e=function(a){a=a.replace(/\r\n/g,"\n");for(var b="",d=0;d<a.length;d++){var c=a.charCodeAt(d);128>c?b+=String.fromCharCode(c):(127<c&&2048>c?b+=String.fromCharCode(c>>6|192):(b+=String.fromCharCode(c>>12|224),b+=String.fromCharCode(c>>6&63|128)),b+=String.fromCharCode(c&63|128))}return b}(e);f=function(b){var a,c=b.length;a=c+8;for(var d=16*((a-a%64)/64+1),e=Array(d-1),f=0,g=0;g<c;)a=(g-g%4)/4,f=g%4*8,e[a]|=b.charCodeAt(g)<<f,g++;a=(g-g%4)/4;e[a]|=128<<g%4*8;e[d-2]=c<<3;e[d-1]=c>>>29;return e}(e);a=1732584193;b=4023233417;c=2562383102;d=271733878;for(e=0;e<f.length;e+=16)q=a,r=b,s=c,t=d,a=k(a,b,c,d,f[e+0],7,3614090360),d=k(d,a,b,c,f[e+1],12,3905402710),c=k(c,d,a,b,f[e+2],17,606105819),b=k(b,c,d,a,f[e+3],22,3250441966),a=k(a,b,c,d,f[e+4],7,4118548399),d=k(d,a,b,c,f[e+5],12,1200080426),c=k(c,d,a,b,f[e+6],17,2821735955),b=k(b,c,d,a,f[e+7],22,4249261313),a=k(a,b,c,d,f[e+8],7,1770035416),d=k(d,a,b,c,f[e+9],12,2336552879),c=k(c,d,a,b,f[e+10],17,4294925233),b=k(b,c,d,a,f[e+11],22,2304563134),a=k(a,b,c,d,f[e+12],7,1804603682),d=k(d,a,b,c,f[e+13],12,4254626195),c=k(c,d,a,b,f[e+14],17,2792965006),b=k(b,c,d,a,f[e+15],22,1236535329),a=l(a,b,c,d,f[e+1],5,4129170786),d=l(d,a,b,c,f[e+6],9,3225465664),c=l(c,d,a,b,f[e+11],14,643717713),b=l(b,c,d,a,f[e+0],20,3921069994),a=l(a,b,c,d,f[e+5],5,3593408605),d=l(d,a,b,c,f[e+10],9,38016083),c=l(c,d,a,b,f[e+15],14,3634488961),b=l(b,c,d,a,f[e+4],20,3889429448),a=l(a,b,c,d,f[e+9],5,568446438),d=l(d,a,b,c,f[e+14],9,3275163606),c=l(c,d,a,b,f[e+3],14,4107603335),b=l(b,c,d,a,f[e+8],20,1163531501),a=l(a,b,c,d,f[e+13],5,2850285829),d=l(d,a,b,c,f[e+2],9,4243563512),c=l(c,d,a,b,f[e+7],14,1735328473),b=l(b,c,d,a,f[e+12],20,2368359562),a=m(a,b,c,d,f[e+5],4,4294588738),d=m(d,a,b,c,f[e+8],11,2272392833),c=m(c,d,a,b,f[e+11],16,1839030562),b=m(b,c,d,a,f[e+14],23,4259657740),a=m(a,b,c,d,f[e+1],4,2763975236),d=m(d,a,b,c,f[e+4],11,1272893353),c=m(c,d,a,b,f[e+7],16,4139469664),b=m(b,c,d,a,f[e+10],23,3200236656),a=m(a,b,c,d,f[e+13],4,681279174),d=m(d,a,b,c,f[e+0],11,3936430074),c=m(c,d,a,b,f[e+3],16,3572445317),b=m(b,c,d,a,f[e+6],23,76029189),a=m(a,b,c,d,f[e+9],4,3654602809),d=m(d,a,b,c,f[e+12],11,3873151461),c=m(c,d,a,b,f[e+15],16,530742520),b=m(b,c,d,a,f[e+2],23,3299628645),a=n(a,b,c,d,f[e+0],6,4096336452),d=n(d,a,b,c,f[e+7],10,1126891415),c=n(c,d,a,b,f[e+14],15,2878612391),b=n(b,c,d,a,f[e+5],21,4237533241),a=n(a,b,c,d,f[e+12],6,1700485571),d=n(d,a,b,c,f[e+3],10,2399980690),c=n(c,d,a,b,f[e+10],15,4293915773),b=n(b,c,d,a,f[e+1],21,2240044497),a=n(a,b,c,d,f[e+8],6,1873313359),d=n(d,a,b,c,f[e+15],10,4264355552),c=n(c,d,a,b,f[e+6],15,2734768916),b=n(b,c,d,a,f[e+13],21,1309151649),a=n(a,b,c,d,f[e+4],6,4149444226),d=n(d,a,b,c,f[e+11],10,3174756917),c=n(c,d,a,b,f[e+2],15,718787259),b=n(b,c,d,a,f[e+9],21,3951481745),a=h(a,q),b=h(b,r),c=h(c,s),d=h(d,t);return(p(a)+p(b)+p(c)+p(d)).toLowerCase()
};

var authHeader = function() {
	var authValue = 'ac4500dd3b7579186c1b0620614fdb1f7d61f944';
	var timestamp = Date.now().toString().substring(0, 10);
	var chromeVersion = navigator.appVersion.match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.(\d+)/);
	return {
		name: 'Chrome-Proxy',
		value: 'ps=' + timestamp + '-' + Math.floor(Math.random() * 1000000000) + '-' + Math.floor(Math.random() * 1000000000) + '-' + Math.floor(Math.random() * 1000000000) + ', sid=' + MD5(timestamp + authValue + timestamp) + ', b=' + chromeVersion[3] + ', p=' + chromeVersion[4] + ', c=win'
	};
};

var defaultBypassRules = '*.metric.gstatic.com';

var defaultAdblockRules = '*://*.googlesyndication.com/*\n*://*.googleadservices.com/*\n*://*.doubleclick.net/*\n*://*.intellitxt.com/*\n*://*.tradedoubler.com/*\n*://*.chitika.net/*\n*://*.amazon-adsystem.com/*\n*://*.yieldmanager.com/*\n*://ads.yahoo.com/*\n*://reklama.onet.pl/*\n*://*.adview.pl/*\n*://*.adocean.pl/*';

var defaultDisableTimeout = 30000;

var proxyURL = localStorage.getItem('proxyURL');

var bypassList = (localStorage.getItem('bypassRules') || defaultBypassRules).split('\n').filter(function(e) { return e });

var adblockList = (localStorage.getItem('adblockRules') || defaultAdblockRules).split('\n').filter(function(e) { return e });

var timeout = localStorage.getItem('disableTimeout') || defaultDisableTimeout;

var today = function() {
	var date = new Date;
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

var tempBytes = 0;

var tempOriginalBytes = 0;

var sessionBytes = 0;

var sessionOriginalBytes = 0;

if (!proxyURL) localStorage.setItem('proxyURL', 'proxy.googlezip.net');

var setProxy = function() {
	chrome.proxy.settings.set({
		value: {
			mode: 'pac_script',
			pacScript: {
				data:	"function FindProxyForURL(url, host) {\n" +
					"  if (url.substring(0,5) == 'http:' && \n" +
					"      !isPlainHostName(host) && \n" +
					"      !shExpMatch(host, '*.local') && \n" +
					"      !isInNet(dnsResolve(host), '10.0.0.0', '255.0.0.0') && \n" +
					"      !isInNet(dnsResolve(host), '172.16.0.0',  '255.240.0.0') && \n" +
					"      !isInNet(dnsResolve(host), '192.168.0.0',  '255.255.0.0') && \n" +
					"      !isInNet(dnsResolve(host), '127.0.0.0', '255.255.255.0') && \n" +
					"      !shExpMatch(host, '(" + bypassList.join('|') + ")'))\n" +
					`    return 'HTTPS ${proxyURL}:443; PROXY ${proxyURL}:80; DIRECT';\n` +
					"  return 'DIRECT';\n" +
					"}"
			}
		},
		scope: 'regular'
	});
	if(chrome.declarativeWebRequest) {
		//Chrome Beta/Dev
		chrome.declarativeWebRequest.onRequest.addRules([
			//Block ads
			{
				conditions: adblockList.map(function(url) {
					return new chrome.declarativeWebRequest.RequestMatcher({
						url: {hostContains: url.replace(/https?:|:|\/|\*/gi, '')},
						stages: ['onBeforeRequest']
					});
				}),
				actions: [
					new chrome.declarativeWebRequest.CancelRequest()
				]
			},
			//Add auth header
			{
				conditions: [
					new chrome.declarativeWebRequest.RequestMatcher({
						url: {schemes: ['http']},
						stages: ['onBeforeSendHeaders']
					})
				],
				actions: [
					new chrome.declarativeWebRequest.SetRequestHeader(authHeader())
				]
			},
			//Get response on error
			{
				conditions: [
					new chrome.declarativeWebRequest.RequestMatcher({
						responseHeaders: [{nameEquals: 'status', valuePrefix: '50'}],
						stages: ['onHeadersReceived']
					})
				],
				actions: [
					new chrome.declarativeWebRequest.SendMessageToExtension({message: 'bypass'})
				]
			}
		]);
		//Handle response
		chrome.declarativeWebRequest.onMessage.addListener(onResponse);
	} else {
		//Chrome Stable
		//Block ads
		chrome.webRequest.onBeforeRequest.addListener(
			onCancel,
			{urls: adblockList},
			['blocking']
		);
		//Add auth header
		chrome.webRequest.onBeforeSendHeaders.addListener(
			onAddAuthHeader,
			{urls: ['http://*/*', 'https://*/*']},
			['requestHeaders', 'blocking']
		);
		//Get response on error
		chrome.webRequest.onHeadersReceived.addListener(
			onResponse,
			{urls: ['http://*/*', 'https://*/*']},
			['responseHeaders']
		);
	}
	localStorage.setItem('isSetProxy', '1');
	chrome.browserAction.setIcon({path: 'on.png'});
	chrome.browserAction.setTitle({title: 'Data Compression Proxy: Enabled'});
};

var unsetProxy = function(userRequested) {
	chrome.proxy.settings.set({
		value: {mode: 'system'},
		scope: 'regular'
	});
	if(chrome.declarativeWebRequest) {
		//Chrome Beta/Dev
		chrome.declarativeWebRequest.onRequest.removeRules();
		chrome.declarativeWebRequest.onMessage.removeListener(onResponse);
	} else {
		//Chrome Stable
		chrome.webRequest.onBeforeRequest.removeListener(onCancel);
		chrome.webRequest.onBeforeSendHeaders.removeListener(onAddAuthHeader);
		chrome.webRequest.onHeadersReceived.removeListener(onResponse);
	}
	if(userRequested) {
		localStorage.setItem('isSetProxy', '0');
		chrome.browserAction.setIcon({path: 'off.png'});
		chrome.browserAction.setTitle({title: 'Data Compression Proxy: Disabled'});
	} else {
		chrome.browserAction.setIcon({path: 'disabled.png'});
		chrome.browserAction.setTitle({title: 'Data Compression Proxy: Temporarily Disabled'});
	}
};

var reloadProxy = function() {
	unsetProxy(false);
	bypassList = (localStorage.getItem('bypassRules') || defaultBypassRules).split('\n').filter(function(e) { return e; });
	adblockList = (localStorage.getItem('adblockRules') || defaultAdblockRules).split('\n').filter(function(e) { return e; });
	timeout = localStorage.getItem('disableTimeout') || defaultDisableTimeout;
	setProxy();
};

var onCancel = function(details) {
	return {cancel: true};
};

var onAddAuthHeader = function(details) {
	details.requestHeaders.push(authHeader());
	return {requestHeaders: details.requestHeaders};
};

var onResponse = function(response) {
	//Bypass proxy on error for *timeout* seconds
	if(response.message == 'bypass' || response.statusLine && response.statusLine.indexOf('50') > -1) {
		unsetProxy(false);
		setTimeout(setProxy, timeout);
	} else if(response.responseHeaders) {
		var compressedBytes = 0;
		var originalBytes = 0;
		//Count compressed and original bytes
		response.responseHeaders.forEach(function(h) {
			if(h.name.toLowerCase() === 'content-length') {
				compressedBytes = parseInt(h.value);
			}
			else if(h.name.toLowerCase() === 'x-original-content-length') {
				originalBytes = parseInt(h.value);
			}
		});
		tempBytes += compressedBytes;
		//Assume original bytes equals compressed bytes if not present
		tempOriginalBytes += (originalBytes === 0 ? compressedBytes : originalBytes);
	}
};

setInterval(function() {
	//Save total bytes every 5 minutes if proxy is set
	if(localStorage.getItem('isSetProxy') === '1') {
		var totalBytes = JSON.parse(localStorage.getItem('totalBytes')) || {};
		totalBytes[today()] = totalBytes[today()] || [0, 0];
		totalBytes[today()][0] += tempBytes; //MB
		totalBytes[today()][1] += tempOriginalBytes; //MB
		localStorage.setItem('totalBytes', JSON.stringify(totalBytes));
		sessionBytes += tempBytes;
		sessionOriginalBytes += tempOriginalBytes;
		tempBytes = tempOriginalBytes = 0;
	}
}, 300000);

chrome.browserAction.onClicked.addListener(function() {
	//Toggle proxy on button clicked
	localStorage.getItem('isSetProxy') === '1' ? unsetProxy(true) : setProxy();
});

if(localStorage.getItem('isSetProxy') !== '0') {
	setProxy();
}