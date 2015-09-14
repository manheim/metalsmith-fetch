"use strict";

var request = require('request');
var debug = require('debug')('metalsmith-fetch');

module.exports = function(param) {

    var fetchProperty = "";

    if (typeof param === "string") {
        debug("Property parameter found: " + param);
        fetchProperty = param;
    } else {
        debug("No property specified!");
    }

    return(function(files, metalsmith, done) {

      Object.keys(files).forEach(function(file) {
        if (files[file][fetchProperty]) {
          debug("For '" + file + "', retrieving: " + files[file][fetchProperty] + "");
          request(files[file][fetchProperty], function(error, response, body) {
            if (!error && response.statusCode == 200) {
              try {
                files[file][fetchProperty] = JSON.parse(body);
                debug("Results parsed as JSON");
                done();
              } catch (e) {
                files[file][fetchProperty] = body;
                done();
              }
            } else {
              debug("Error retrieving '" + files[file][fetchProperty] + "': " + response.statusCode);
              done();
            }
          });
        }
      });

    });

}
