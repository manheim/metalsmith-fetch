"use strict";

var request = require('request');
var debug = require('debug')('metalsmith-fetch');

module.exports = function(param) {

    var fetchProperty = "";

    if (typeof param === "string") {
        fetchProperty = param;
    } else {
        debug("No property specified!");
    }

    return(function(files, metalsmith, done) {

      Object.keys(files).forEach(function(file) {
        if (files[file][fetchProperty]) {
          request(files[file][fetchProperty], function(error, response, body) {
            if (!error && response.statusCode == 200) {
              try {
                files[file][fetchProperty] = JSON.parse(body);
              } catch (e) {
                files[file][fetchProperty] = body;
              }
            } else {
              debug("Error retrieving '" + files[file][fetchProperty] + "': " + e.getMessage());
            }
          });
        }
      });

      done();

    });

}
