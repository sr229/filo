# Filo Browser Extension

Kappy-proxy's browser extension, Filo, is the middleware between the proxy and origin. It is capable of rewriting requests and sending them to the proxy for compression.

## How does this work?

Filo uses the same design concept as Bandwidth Hero, except it proxies every static content request it sees (with the exception of octet-stream content). The browser extension does the following:

- Intercepts the request and checks if its a static content request.
 - It also checks if its within the blacklist. If it is, it is not proxied.

- Rewrites the resulting URL to the proxied URL.

## Is there any kind of data savings for it?

Not in my knowledge. Filo and kappy-proxy is only designed to accelerate page loading, ala-AMP. If there is any kind of data savings from this extension, please do let me know.

## Installing

TBA