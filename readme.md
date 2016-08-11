# React & WordPress starter
The philosophy behind this dev setup is that WordPress should handle serverside-rendering of content and React should kick in and take over the UI after the initial page load. WordPress also handles the initial data fetching and outputs the result as a JS object for React to read. (See `ahr_js_config` in /wp-content/themes/my-project/functions/resources.php for more)

It's a pretty bare-bones skeleton, so the source code should be fairly easy to get familiarized with.

## What's included?
- React, Redux and React Hot Loader
- PostCSS for both the theme style file and for JS
- SVG sprite sheets
- Image compression
- Bootstrap V4 alpha (Sass version)
- Loaders.css (Sass version)

## Getting started
1. Set up a new local apache server and database for hosting WordPress. For instance `http://my-project.dev`
2. Download WordPress and put it in the /wp folder
3. Rename the theme folder in wp-content/themes and update style.css with any theme metadata
4. Go to dev/paths.js and update the reference to the theme folder and local URL
5. Go to wp-content.php and change `WP_DEFAULT_THEME` to the name of your theme

### Installing dependencies and running the local server
- `npm i && gulp serve` will install all deps, build in dev mode and open the site in a new browser window.
- `gulp dev` does the same as gulp serve, but without opening a new browser window.
- `gulp build` runs production optimization on all assets and runs scripts through es-lint. You need to turn off `SCRIPT_DEBUG` in local-config.php for the JS to load on your dev url.

### Database config
Make a copy of local-config-sample.php call it local-config.php then update the credentials within that file.

## Other notes
Theme and plugins are under version control – WordPress core is not. WordPress should be installed in /wp.

Plugins added to `wp-content/mu-plugins` are autoloaded and can't be disabled through the WP admin inteface. This folder contains one placeholder plugin to begin with.

