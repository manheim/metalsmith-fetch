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
                    assert.notEqual(files['one.md']['test'].indexOf("<!DOCTYPE html>"),-1);
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
                    assert.notEqual(files['one.md']['test']['http'],null);
                    done();
                }
            });
    });

    it('should work when there are no properties to fetch', function(done) {
      var metalsmith = Metalsmith('test/fixtures/none');
      metalsmith
          .use(fetch('test'))
          .build(function(err, files) {
              if (err) {
                  return(done(err));
              } else {
                  assert.equal(files['one.md']['test'],null);
                  done();
              }
          });
    });

    it('should fetch a URL that points to a local file in a relative directory', function(done) {
      var metalsmith = Metalsmith('test/fixtures/file');
      metalsmith
          .use(fetch('test'))
          .build(function(err, files) {
              if (err) {
                  return(done(err));
              } else {
                  assert.equal(files['one.md']['test']['foo'],'bar');
                  done();
              }
          });
    });

    it('should process multiple files', function(done) {
      var metalsmith = Metalsmith('test/fixtures/two');
      metalsmith
          .use(fetch('test'))
          .build(function(err, files) {
              if (err) {
                  return(done(err));
              } else {
                  assert.notEqual(files['one.md']['test']['http'],null);
                  assert.equal(files['two.md']['test']['foo'],'bar');
                  done();
              }
          });
    });

});
