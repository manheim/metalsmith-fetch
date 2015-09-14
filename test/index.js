var assert = require('assert');
var Metalsmith = require('metalsmith');
var fetch = require('..');

describe('metalsmith-fetch', function() {

    it('should fetch a URL and add it as a property', function(done) {
        var metalsmith = Metalsmith('test/fixtures/html');
        metalsmith
            .use(fetch('test'))
            .build(function(err, files) {
                if (err) {
                    return(done(err));
                } else {
                    Object.keys(files).forEach(function(file) {
                        assert.notEqual(files[file]['test'].indexOf("<!DOCTYPE html>"),-1);
                    });
                    done();
                }
            });
    });

    it('should fetch a URL that returns JSON and add it as a parsed property', function(done) {
        var metalsmith = Metalsmith('test/fixtures/json');
        metalsmith
            .use(fetch('test'))
            .build(function(err, files) {
                if (err) {
                    return(done(err));
                } else {
                    Object.keys(files).forEach(function(file) {
                        assert.notEqual(files[file]['test']['http'],null);
                    });
                    done();
                }
            });
    });

});
