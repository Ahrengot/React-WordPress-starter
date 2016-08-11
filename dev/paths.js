var theme = '../wp-content/themes/my-project/';
var assets = theme + 'assets/';

module.exports = {
	http: 'http://my-project.dev/',
	base: theme,
	assets: assets,
	assetsURI: assets.slice(2),
	img: assets + 'img/',
	svg: assets + 'svg/',
	css: assets + 'css/',
  fonts: assets + 'fonts/',
	js: assets + 'scripts/'
};
