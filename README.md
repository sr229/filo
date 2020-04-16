# Filo

Filo is a small proxy server I coded to intercept all static content requests to compressed counterparts.

This project is inspired of bandwidth-hero-proxy and Google's very own Data Saver

## Rationale

There are websites that underperforms on 3G connections, even if you have a decent DNS like [1.1.1.1](https://1.1.1.1), it still boils down to how much your internet can get everything on time.

Most times, websites that has large bundles times out on slow connections, or even causes connection closures because of how slow it is. Filo tries to solve all that by GZIPping all content, regardless if served by HTTP or HTTP/S. The whole point of this project is to make the internet a little bit more faster for the third-world user.

This should be used with a browser extension, which is in the works.

## Running

TBA

## Privacy

By using this software, you are aware that this software is not a anonymizing proxy, and it will use a remote server, which you will fully manage by yourself, for this service to work.

This software does not send any kind of analytical data or diagnostics to the authors. 

## License

This repository is Copyright &copy; Capuccino. Licensed under MIT.

Portions of this code is inspired of [Anatoliy Yastreb](https://github.com/ayastreb)'s work, but we made it simpler to be worked on.