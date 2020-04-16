# Filo Image Compression Server

The Filo image compression server is reponsible for converting images to WebP, a image standard designed exclusively for the web which decreases the size of images - allowing the
page to load faster than ever.


## Why WebP

WebP is a very well-supported standard by major browser vendors today, even the current Firefox ESR supports WebP. While we can't enumerate how much benefits we can get using WebP,
one of the features WebP we love (and the reason why we're using WebP right now) is that WebP gives drastically smaller sizes vs competing codecs like PNG and JPEG. It's sad it doesn't get that much of attention however.

## Why just images?

While we can also intercept CSS and JS bundles, it would be hard for us to do MITM with them since there's strict CSPs on most major sites, which would break them mostly. So we're 
limited on images for now. If you can come up with a good solution to allow this, we're open for suggestions!

## Running

TBA