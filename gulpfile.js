const { src, dest, watch, series, parallel } = require('gulp');

const clean = require('gulp-clean');
const sass = require('gulp-sass');
const fileInclude = require('gulp-file-include');
const autoPrefix = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const jsuglify = require('gulp-uglify');
const webserver = require('gulp-webserver');

function cleanTask(){
  return src('./dist',{ allowEmpty : true })
    .pipe(clean());
}

function sassTask(){
  return src('./src/css/**')
      .pipe(sass())
      .pipe(autoPrefix())
      .pipe(cssmin())
      .pipe(dest('./dist/css'));
}

function htmlTask(){
  return src('./src/view/*.html')
      .pipe(fileInclude({
        basepath: './template'
      }))
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true
      }))
      .pipe(dest('./dist/'));
}

function jsTask(){
  return src('./src/js/*.js')
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(jsuglify())
      .pipe(dest('./dist/js'));
}

function libTask(){
  return src('./src/lib/**')
    .pipe(dest('./dist/lib'));
}

function fontTask(){
  return src('./src/font/**')
          .pipe(dest('./dist/font'));
}

function imageTask(){
  return src('./src/image/**')
          .pipe(dest('./dist/image'));
}

function webTask(){
  return src('./dist')
        .pipe(webserver({
          host : 'localhost',
          port : 4000,
          open : './index.html',
          livereload : true,
          proxies: [{
            source: '/api', 
            target: 'http://localhost:3000/'
          }]
        }));
}

function watchTask(){
  watch('./src/view/*.html', htmlTask);
  watch('./src/css/*.scss', sassTask);
  watch('./src/js/*.js', jsTask);
}

module.exports = {
  watchfile : watchTask,
  server: webTask,
  dev: series( cleanTask , parallel(htmlTask, sassTask, jsTask, imageTask, libTask, fontTask), parallel(watchTask, webTask))
}