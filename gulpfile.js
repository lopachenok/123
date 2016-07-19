'use strict';

const gulp = require('gulp');
//const sass = require('gulp-sass');
const debug = require('gulp-debug');
const notify = require('gulp-notify');
const gulpIf = require('gulp-if');
const postcss = require('gulp-postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const mqpacker = require('css-mqpacker');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const del = require('del');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const svgSprite = require('gulp-svg-sprite');
const fileinclude = require('gulp-file-include');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const ghPages = require('gulp-gh-pages');
const rigger = require('gulp-rigger');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const stylelint = require("stylelint");
const reporter = require("postcss-reporter");
const streamqueue = require('streamqueue');


const pjson = require('./package.json');
const dirs = pjson.config.directories;
const ghPagesUrl = pjson.config.ghPages;

// Запуск `NODE_ENV=production gulp [задача]` приведет к сборке без sourcemaps
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';


//Компиляция CSS
gulp.task('css', function(){
  return streamqueue(
        { objectMode: true },
        gulp.src(dirs.source + '/css/style.css')
          .pipe(gulpIf(isDev, sourcemaps.init()))    
          .pipe(postcss([
              precss(),
              function (css) {
                css.walkDecls(/^background/, function (decl) {
                  if (decl.value.indexOf('url') !== -1) {
                    const urlBefore = '../img/';
                    let imgPath = decl.value.match(/\((.)*\)/gi)[0];
                    imgPath = imgPath.replace(/['"\(\)\s]/gi, '');
                    decl.value = 'url(' + urlBefore + imgPath + ')';
                  }
                });
              },
              stylelint(),
              reporter({ clearMessages: true }),
              autoprefixer({browsers: ['last 2 version']}),
              mqpacker,
              cssnano        
          ]))
          .pipe(rename('style.min.css')),
        gulp.src(dirs.source + '/css/vendor.css') 
          .pipe(postcss([
              precss(),        
              autoprefixer({browsers: ['last 2 version']}),
              mqpacker,
              cssnano        
          ]))
          .pipe(rename('vendor.min.css'))
        )  
    
    .on('error', notify.onError(function(err){
      return {
        title: 'Styles compilation error',
        message: err.message
      }
    }))
   
    .pipe(gulpIf(isDev, sourcemaps.write('.')))
    .pipe(gulp.dest(dirs.build + '/css'))
    .pipe(browserSync.stream());
});

// Очистка папки сборки
gulp.task('clean', function () {
  return del([
    dirs.build + '/**/*',
    '!' + dirs.build + '/readme.md'
  ]);
});


//TODO: Newer не работает, т к меняется путь.
// Копирование и оптимизация изображений из папки img
gulp.task('img', function () { 
  return gulp.src(dirs.source + '/blocks/**/*.{png,jpg}',  {since: gulp.lastRun('img')}) // только для изменившихся с последнего запуска файлов   
    .pipe(debug({title: 'img'}))
    .pipe(newer(dirs.build + '/img'))  
    .pipe(debug({title: 'cached'}))
    .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5,
            //use: [pngquant()],
            interlaced: true
          }))
    .pipe(debug({title: 'imgmin'}))
    .pipe(rename(function(path){  // удаляем текущий dirname
      path.dirname = '';
      return path;
    }))
   
    .pipe(gulp.dest(dirs.build + '/img'));
});

// Сборка SVG-спрайта
gulp.task('svgsprite', function() {
  return gulp.src(dirs.source + '/blocks/**/*.svg')
      .pipe(svgSprite({
        mode: {
          css: {
            dest:       '.', 
            bust:       false,
            sprite:     'sprite.svg', 
            layout:     'vertical',
            prefix:     '.', 
            dimensions: true,
            render:     {
              css: {
                dest: 'sprite.css'  
              }
            }
          }
        }
      }))
      .pipe(debug({title: 'styles:svg'}))
      .pipe(gulpIf('*.css', gulp.dest(dirs.source + '/css'), gulp.dest(dirs.build + '/img')));
});

// Сборка HTML
gulp.task('html', function() {
  return gulp.src(dirs.source + '/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true,
    }))
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(gulp.dest(dirs.build))
});

//Конкатенация и минификация js

gulp.task('js', function () {      
  return streamqueue(
        { objectMode: true },
        gulp.src(dirs.source+'/js/main.js')
          .pipe(rigger())
          .pipe(jshint())
          .pipe(jshint.reporter(stylish)),
        gulp.src(dirs.source+'/js/vendor.js')
          .pipe(rigger())
      )  
    //.pipe(concat('main.js'))
    .pipe(gulpIf(isDev, sourcemaps.init()))        
    .pipe(gulpIf(!isDev, rename({ suffix: '.min' })))
    .pipe(gulpIf(!isDev, uglify()))
    .on('error', notify.onError(function(err){
        return {
          title: 'Javascript uglify error',
          message: err.message
        }
     }))
     .pipe(gulpIf(isDev, sourcemaps.write('.')))        
     .pipe(gulp.dest(dirs.build+'/js'))
});

// Сборка 
gulp.task('build', gulp.series(
  'clean',
  'svgsprite',
  gulp.parallel('css', 'img', 'js'),
  'html'
));

// Локальный сервер, слежение
gulp.task('server', gulp.series('build', function() {
  browserSync.init({
    server: {
        baseDir: dirs.build
    },
    //tunnel: true,
    host: 'localhost',
    port: 9000,
    injectChanges: true,
    logPrefix: "App Front-End"
  });
  gulp.watch([
    dirs.source + '/*.html',
    dirs.source + '/include/*.html',
    dirs.source + '/blocks/**/*.html',
  ], gulp.series('html', reloader));
  gulp.watch([
    dirs.source + '/css/*.css', 
    dirs.source + '/blocks/**/*.css'
  ], gulp.series('css'));
  gulp.watch(dirs.source + '/blocks/**/*.{png,jpg}', gulp.series('img', reloader));
  gulp.watch([
    dirs.source + '/blocks/**/*.js',
    dirs.source + '/js/*.js' 
  ], gulp.series('js', reloader));
  
}));

// Задача по умолчанию
gulp.task('default',
  gulp.series('server')
);

// Отправка в git pages
gulp.task('deploy', function() {  
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

function reloader(done) {
  browserSync.reload();
  done();
}