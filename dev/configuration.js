module.exports = {
  postCssPlugins: [
    // First we use our importer to stich everything together
    require('postcss-import')({from: 'src/css/main.css'}), // sass-like imports

    // Sass-like plugins
    require('postcss-simple-vars')(),
    require('postcss-color-function')(),
    require('postcss-nested')(),

    // Other plugins
    require('postcss-calc')(), // sass-like syntax
    require('postcss-short')(), // short-hand syntax: https://github.com/jonathantneal/postcss-short
    require('postcss-inline-svg')({path: '../'}), // inline svg and change colors etc
    require('postcss-focus')(), // Automatically add :focus styling for better keyboard nav

    require('autoprefixer')({browsers: 'last 2 versions'}),

    // Error logging
    require('postcss-reporter')(),
  ]
}