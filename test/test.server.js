var minifyRequired = !!process.env.MINIFY;

var connect = require('connect');
var serveStatic = require('serve-static');
var app = module.exports = connect();
app.use(require('connect-route')(function (router) {
  router.get('/message-center.js', function (req, res, next) {
    if (minifyRequired) minifyIt(function (minified) { res.end(minified); });
    else next();
  });
}));
app.use(serveStatic('test/app'));

var ugliyfied;
function minifyIt(done) {
  if (ugliyfied) return done(ugliyfied);
  var UglifyJS = require('uglify-js');
  var source = require('path').join(process.cwd(), 'message-center.js');
  ugliyfied = UglifyJS.minify(source).code;
  done(ugliyfied);
}
