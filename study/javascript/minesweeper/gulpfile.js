

const gulp = require('gulp');
const path = require('path');
//const {transformScript}  = require('./gulp-app-config');
const inject = require('gulp-inject');
const DES_PATH = __dirname+'static/'

function transformScript(path){
    console.log("!!!!!!!!!!!!!!!!"+path);
    return '<script type="text/javascript" charset="utf-8" src="'+path+'"></script>';
}

/**
 * 转义JavaScript
 */
gulp.task('webpack',()=>{
    const webpack = require('webpack-stream');
    const config = require('./webpack.config');
    return gulp.src('./src/js/*.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('./static/js'))
});


gulp.task('injectPrograms',['webpack'],function(){
    return gulp.src(__dirname+'/index.html')
    .pipe(inject(gulp.src(['./static/js/**.js'],{read:false}),{
        starttag:'<!-- inject:index -->',
        transform:transformScript
    }))
    .pipe(gulp.dest(__dirname+'/static'))
})

/**
 * 转义scss
 */

 gulp.task('scss',()=>{
    const scss = require("gulp-sass");
    const sourceMaps = require("gulp-sourcemaps");
    gulp.src('./src/scss/*.scss')
    .pipe(sourceMaps.init())
    .pipe(scss().on('error', scss.logError))
    .pipe(sourceMaps.write('./maps'))
    .pipe(gulp.dest('./static/css'))
 });
gulp.task('watch',()=>{
    gulp.watch('./src/scss/*.scss',['scss']);
    gulp.watch('./src/js/**/*.js',['webpack','injectPrograms'])
})

 /**
  * 
  */
gulp.task('default',["webpack","scss"]);