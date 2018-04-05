var gulp = require('gulp');
var gutil = require('gulp-util');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var scss = require('postcss-scss');
var autoprefixer = require('autoprefixer');
var postcssProcessors = [
    autoprefixer( { browsers: ['last 2 versions', 'ie > 10'] } )
]

gulp.task('sassInline', function(callback) {
    return gulp.src('src/sass/inline.scss')
        .pipe(
           postcss(postcssProcessors, {syntax: scss})
        )
        .pipe(
            sass({ outputStyle: 'expanded' })
            .on('error', gutil.log)
        )
        .pipe(gulp.dest('build/css/'));
});

gulp.task('sassEmbedded', function(callback) {
    return gulp.src('src/sass/embedded.scss')
        .pipe(
           postcss(postcssProcessors, {syntax: scss})
        )
        .pipe(
            sass({ outputStyle: 'compressed' })
            .on('error', gutil.log)
        )
        .pipe(gulp.dest('build/css/'));
});

var inlineCss = require('gulp-inline-css');

// removed 'images' from the array
gulp.task('inlinecss', ['sassInline', 'nunjucks'], function() {
    return gulp.src('build/*.html')
        .pipe(
            inlineCss({
                applyStyleTags: false,
                removeStyleTags: false,
                applyLinkTags:   true,
                removeLinkTags:  false
            })
            .on('error', gutil.log)
        )
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

var nunjucksRender = require('gulp-nunjucks-render');

gulp.task('nunjucks', ['sassEmbedded'], function() {
    return gulp.src('src/templates/*.+(html|nunjucks)')
          .pipe(
            nunjucksRender({
              path: ['src/templates/', 'build/css/']
          })
        )
        .pipe(gulp.dest('build/'));
});

gulp.task('assets', function() {
    return gulp.src('src/assets/images/*.png')
        .pipe(gulp.dest('build/assets/images/'))
});

var connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        port: 8000,
        root: 'build',
        livereload: true
    });
});

// var imagesData = require('./client_links.json');
// var replace = require('gulp-batch-replace');

// gulp.task('images', function() {
//     return gulp.src('build/*.html')
//         .pipe(replace(imagesData.files))
//         .pipe(gulp.dest('./'));
// });

var filesToWatch = [
    'src/sass/**/*.scss',
    'src/emails/*.nunjucks',
    'src/templates/**/*.nunjucks',
    'src/data/*.json'
]

gulp.task('watch', function() {
    gulp.watch(filesToWatch,['nunjucks', 'inlinecss']);
});

gulp.task('default', ['connect', 'nunjucks', 'inlinecss', 'watch', 'assets']);
