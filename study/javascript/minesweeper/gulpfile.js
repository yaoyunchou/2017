const gulp = require('gulp');


/**
 * 转义JavaScript
 */
gulp.task('webpack',()=>{
    const webpack = require('webpack-stream');
    const config = require('./webpack.config');
    gulp.src('./src/js/*.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('./static/js'))
});


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
    gulp.watch('./src/js/**/*.js',['webpack'])
})

 /**
  * 
  */
gulp.task('default',["webpack","scss"]);