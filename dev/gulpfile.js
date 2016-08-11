var _ = require( 'underscore' );

var path = require('path');
var paths = require('./paths');
var config = require('./configuration');

// Gulp + gulp tools
var gulp = require('gulp');
var runSequence = require('run-sequence');
var $ = require( 'gulp-load-plugins' )();
var del = require('del');

// Browser sync
var browserSync = require('browser-sync').create();

// Webpack
var webpack = require("webpack");

var settings = {
	isBuild: false,
	openBrowser: false
};

/**
 * Images and media
 */
gulp.task('svg', function() {
	return gulp.src( 'src/svg/*.svg' )
		.pipe( $.svgmin(function(file) {
			var prefix = path.basename(file.relative, path.extname(file.relative));
			return {
				plugins: [{
					cleanupIDs: {
						prefix: prefix + "-",
						minify: true
					}
				}]
			}
		}) )
		.pipe( $.svgstore({ inlineSvg: true }) )
		.pipe( $.rename('combined.svg') )
		.pipe( gulp.dest( paths.svg ) )
		.pipe( browserSync.stream() )
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*')
		.pipe( $.imagemin({progressive: true}) )
		.pipe( gulp.dest( paths.img ) )
		.pipe( browserSync.stream() )
});

/**
 * File management
 */
gulp.task('clean', function() {
	return del( paths.assets + '*', {force: true} );
})

gulp.task('copy-fonts', function() {
	return gulp.src( 'src/fonts/**/*' )
		.pipe( gulp.dest( paths.fonts ) )
});

gulp.task('rev', function() {
	var resources = [
		paths.assets + '**/*.css',
		paths.assets + '**/combined.min.js'
	];

	return gulp.src( resources )
		.pipe( $.rev() )
		.pipe( $.revDeleteOriginal() )
		.pipe( gulp.dest( paths.assets ) )
		.pipe( $.rev.manifest() )
		.pipe( gulp.dest( paths.assets) );
});

/**
 * Pre-processors
 */
gulp.task('compile-bootstrap', function() {
	return gulp.src( 'src/css/lib/bootstrap.scss' )
		.pipe( $.sass().on('error', $.sass.logError) )
		.pipe( gulp.dest( 'src/css/lib' ) )
});

gulp.task('compile-loaders', function() {
	return gulp.src( 'src/css/lib/loaders/loaders.scss' )
		.pipe( $.sass().on('error', $.sass.logError) )
		.pipe( gulp.dest( 'src/css/lib' ) )
});

gulp.task('postcss', function() {
	var stream = gulp.src( 'src/css/*.css' );

	if (settings.isBuild) {
		stream.pipe( $.postcss(config.postCssPlugins) )
			.pipe( $.cssnano() )
	 		.pipe( gulp.dest( paths.css ) )
	} else {
		stream.pipe( $.sourcemaps.init() )
			.pipe( $.postcss(config.postCssPlugins) )
			.pipe( $.sourcemaps.write() )
	 		.pipe( gulp.dest( paths.css ) )
			.pipe( browserSync.stream() );
	}

	return stream;
});

/**
 * Building JS
 */
gulp.task('webpack-build', function() {
	return gulp.src( 'src/scripts/index.jsx' )
		.pipe( $.webpack(require("./webpack/config-build.js"), webpack) )
		.pipe( gulp.dest( paths.js ) )
});

/**
 * Linting and testing
 */
gulp.task('lint-js', function() {
	return gulp.src( 'src/scripts/**/*{.js,.jsx}' )
		.pipe( $.eslint() )
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe( $.eslint.format() )
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe( $.eslint.failAfterError() );
});

/**
 * Dev and test environment
 */
gulp.task('browser-sync', function() {
	var webpackConfig = require("./webpack/config.js");
	var webpackDevMiddleware = require('webpack-dev-middleware');
	var webpackHotMiddleware = require('webpack-hot-middleware');

	var webpackBunder = webpack(webpackConfig);

	browserSync.init({
		open: settings.openBrowser,
		proxy: paths.http,
		middleware: [
			webpackDevMiddleware(webpackBunder, {
				// http://webpack.github.io/docs/webpack-dev-middleware.html
				publicPath: webpackConfig.output.publicPath,
				stats: { colors: true }
			}),
			// bundler should be the same as above
			webpackHotMiddleware(webpackBunder)
		],
		files: [
			paths.base + '**/*.php'
		]
	});

	gulp.watch('src/css/**/*.css', ['postcss']);
	gulp.watch('src/css/lib/**/*.scss', ['compile-bootstrap', 'compile-loaders']);
	gulp.watch('src/img/**/*', ['img']);
	gulp.watch('src/svg/*', ['svg']);
});

gulp.task('serve', function() {
	settings.openBrowser = true;
	runSequence('dev');
})

var primaryBaseTasks = [
	'clean',
	'compile-bootstrap',
	'compile-loaders'
];

var secondaryBaseTasks = [
	'copy-fonts',
	'svg',
	'img',
	'postcss'
];

gulp.task('dev', function(callback) {
	runSequence(primaryBaseTasks, secondaryBaseTasks, 'browser-sync', callback);
})

gulp.task('build', function(callback) {
	settings.isBuild = true;
	runSequence('lint-js', primaryBaseTasks, secondaryBaseTasks, 'webpack-build', 'rev', callback);
})

gulp.task('default', ['dev']);
