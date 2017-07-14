/**
 * Created by yaoyc on 2016/4/5.
 */
var wechatConfig = require('./wechat-config');
var gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require("gulp-uglify"),
	sourcemaps = require('gulp-sourcemaps'),
	rimraf = require('gulp-rimraf'),
	jsmin = require('gulp-jsmin'),
	inject = require('gulp-inject'),
	concat = require('gulp-concat');



var ROOT = wechatConfig.root;
var PROGRAM = ROOT + 'app/';
var PLUGIN = ROOT + 'plugins/';
var DES_PATH = ROOT + 'target/';
var Debug = true;


/*******************************************************************************************************************************************************************************/
//get program scripts filters
function getPluginScripts(name) {
	var plugins = [];
	wechatConfig.plugins[name].forEach(function (module) {
		plugins.push(PLUGIN + module);
	});
	return plugins;
}

//get program scripts filters
function getProgramScripts() {
	var scripts = [];
	wechatConfig.programs.modules.forEach(function (module) {
		module = module==='*'?'':module;
		wechatConfig.programs.sorter.forEach(function (sortItem) {
			scripts.push(PROGRAM + module + '/' + sortItem);
		});

	});
	return scripts;
}

function getProgramCss(){
	var styles = [];
	wechatConfig.programs.modules.forEach(function (module){
		module = module==="*"?'':module;
		wechatConfig.programs.css.forEach(function(cssItem){
			styles.push(PROGRAM + module + '/' + cssItem);
		})
	});
	return styles;
}

//get program css filters
function getPluginCss() {
	var styles = [];
	wechatConfig.plugins.css.forEach(function (module) {
		styles.push(PLUGIN + module);
	});
	return styles;
}


function transformPath(path) {
	return path.replace('/' + ROOT, '../');
}
function transformScript(path) {
	return '<script type="text/javascript" charset="utf-8" src="' + transformPath(path) + '"></script>';
}
function transformCss(path) {
	return '<link rel="stylesheet"  href="' + transformPath(path) + '">';
}


gulp.task('injectPrograms',['concatFrames','concatTools','concatComponents'], function () {
	var conponentList;
	if(Debug){
		conponentList = getProgramScripts();
	}else{
		conponentList = [DES_PATH+'conponent.min.js'];
	}
	return gulp.src(DES_PATH + '/index.html')
		.pipe(inject(gulp.src([DES_PATH+'frames.min.js',DES_PATH+'tools.min.js'], {read: false}), {
			starttag: '<!-- inject:pluginjs -->',
			transform: transformScript
		}))
		/*.pipe(inject(gulp.src(getProgramScripts(), {read: false}), {
			starttag: '<!-- inject:programjs -->',
			transform: transformScript
		}))*/
		.pipe(inject(gulp.src(conponentList, {read: false}), {
			starttag: '<!-- inject:programjs -->',
			transform: transformScript
		}))

		.pipe(inject(gulp.src(getPluginCss(), {read: false}), {
			starttag: '<!-- inject:plugin css -->',
			transform: transformCss
		}))
		.pipe(inject(gulp.src(getProgramCss(), {read: false}), {
			starttag: '<!-- inject:program css -->',
			transform: transformCss
		}))
		.pipe(gulp.dest(PROGRAM));
});

gulp.task('concatFrames', function () {
	return gulp.src(getPluginScripts('frames'))
		//.pipe(sourcemaps.init())
		.pipe(concat('frames.min.js'))
		//.pipe(jsmin())
		.pipe(uglify())
		//.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest(DES_PATH));
});
gulp.task('concatTools', function () {
	return gulp.src(getPluginScripts('tools'))
			//.pipe(sourcemaps.init())
			.pipe(concat('tools.min.js'))
			//.pipe(jsmin())
			.pipe(uglify())
			//.pipe(sourcemaps.write('/'))
			.pipe(gulp.dest(DES_PATH));
});


gulp.task('concatComponents', function () {
	return gulp.src(getProgramScripts())
		.pipe(concat('conponent.min.js'))
		//.pipe(jsmin())
		.pipe(uglify())
		.pipe(gulp.dest(DES_PATH));
});

gulp.task('injectAll', ['concatFrames','concatTools','concatComponents','injectPrograms']);