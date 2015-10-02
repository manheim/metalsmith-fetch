# metalsmith-fetch

A [Metalsmith](https://github.com/segmentio/metalsmith) plugin to fetch a URL property and add it to the file's context.

## Features

Executes an HTTP GET against the configured property for each file and stores the results as the value of that property.
If the results are JSON, it is parsed before it is stored, otherwise it's stored as a string value.

## Installation

    $ npm install metalsmith-fetch

## Usage

For this Metalsmith pipeline:

```js
var fetch = require('metalsmith-fetch');

Metalsmith(__dirname)
    .use(fetch('swagger'))
    .use(markdown())
    .use(templates('handlebars'))
    .build(function(err) {
        if (err) throw err;
    });
```

and a file with this YAML front matter:

```
---
layout: layout.html
title: A page
swagger: http://petstore.swagger.io/v2/swagger.json
---
Page content
```

The template will have access to a "swagger" variable with the full JSON returned by the URL.

Both fully qualified URLs, as well as local, relative `file:` URLs are supported.

See the tests for more examples.
