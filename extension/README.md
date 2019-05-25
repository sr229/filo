# Filo Browser Extension

The Filo Browser Extension is a fork of the Bandwidth Hero extension, modified to intercept ALL static content requests in exception of media queries.

## What doesn't work?

Currently the compression host knows how to compress stylesheets and scripts, however, it seems that passing any stylesheet, font and script makes it return 503. In order for the proxy to be effective, all of this must be proxied as well. I'm investigating how to do this right now.

## Developing Filo

You'll need Node.js and NPM to run this. After that, you need to run `npm run build` or `yarn build`, and Load it unpacked in either Chrome or Firefox.

To make sure your extension gets loaded with the current code, do `yarn watch` after building and hit reload on chrome://extensions after a while.

*Note: Make sure you set the browser to developer mode else it won't load the extension.*

## Installing

TBA