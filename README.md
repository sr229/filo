# Kappy-Proxy

Kappy-Proxy is a small proxy server with image compression features borrowed from ayastreb's 
Bandwidth Hero Project.

The main difference between the two is I proxy **everything**, instead of proxying just media.

## Privacy

Unfortunately, this proxy does not anonymize you, but it allows you to circumvent firewalls.

You're better off with a VPN if you're looking for a anonymizing proxy.

None of your data in this server is saved on cache. They are done in-buffer and none of your data is saved
on disk.

## Rationale behind the project

The rationale behind the project is my main interest with accelerator proxies, aka proxies that accelerate
your page loading times by using a proxy and image compression to compensate load times.

Google Data Saver exists, yes, but Google is very trivial when it comes to data privacy. And I wanted to 
emulate the Data Saver features, and improve upon it by adding the following:

- Compression of images even in HTTP/S connections.
- Proxying of HTML files and cached in a Anycast CDN.

## Running

Simply run `npm i --save`, that's it!

This is supposed to work with a browser extension, however, you can simply test if it works by using `curl`:

```
curl -vv -x http://localhost:8213 https://www.google.com
```

## License

Parts of the repository borrows from ayastreb's Bandwidth Hero project. The Project is licensed under MIT.

This repository is Copyright &copy; Capuccino. Licensed under MIT.
