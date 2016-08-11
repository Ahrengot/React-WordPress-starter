// Use ProvidePlugin (Webpack) or loose-envify (Browserify)
// together with Uglify to strip the dev branch in prod build.
if (typeof __ENV__ !== 'undefined' && __ENV__ === 'development') {
  module.exports = require('./configure-store.dev');
} else {
  module.exports = require('./configure-store.prod');
}