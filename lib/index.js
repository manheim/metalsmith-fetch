"use strict";

var request = require('request');
var debug = require('debug')('metalsmith-fetch');
var fs = require('fs');

var processResults = function(data) {
  var prop;
  try {
    prop = JSON.parse(data);
    debug("Results parsed as JSON");
    return(prop);
  } catch (e) {
    prop = data;
  }
  return(prop);
}

module.exports = function(param) {

    var fetchProperty = "";

    if (typeof param === "string") {
        debug("Property parameter found: " + param);
        fetchProperty = param;
    } else {
        debug("No property specified!");
    }

    return(function(files, metalsmith, done) {

      var keyCount = Object.keys(files).length;
      var count = 0;

      Object.keys(files).forEach(function(file) {
        if (files[file][fetchProperty]) {
          var url = files[file][fetchProperty];
          debug("For '" + file + "', retrieving: " + files[file][fetchProperty] + "");
          if (url.startsWith("file:")) {
            fs.readFile(url.slice(5),function(err, data) {
              if (error) {
                debug("Error loading file => " + error);
              } else {
                files[file][fetchProperty] = processResults(data);
              }
              if (++count === keyCount) {
                debug("Fetch processing complete.");
                done();
              }
            });
          } else {
            request(url, function(error, response, body) {
              if (!error && response && response.statusCode == 200) {
                debug("File = " + file);
                files[file][fetchProperty] = processResults(body);
              } else {
                debug("Error retrieving URL => " + error);
                if (response) {
                  debug("Response status code: " + response.statusCode);
                }
              }
              if (++count === keyCount) {
                debug("Fetch processing complete.");
                done();
              }
            });
          }
        } else {
          debug("No '" + fetchProperty + "' property found for '" + file + "'");
          if (++count === keyCount) {
            debug("Fetch processing complete.");
            done();
          }
        }
      });

    });

}
