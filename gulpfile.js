const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const { src, series, parallel, dest, watch } = require('gulp');
const minify = require('gulp-minify');
const runList = [copyIcons, copyLogo, copyFiles, compileJS, compileSass, copyFonts]

function copyIcons() {
    return src("src/icon/**")
        .pipe(dest('dist/icon'));
}

function copyFonts() {
    return src("src/assets/fonts/**")
        .pipe(dest('dist/assets/fonts'));
}

function copyLogo() {
    return src("src/logo/**")
        .pipe(dest('dist/logo'));
}

function copyFiles() {
    return src(["src/robots.txt", "src/favicon.ico"])
        .pipe(dest('dist/'));
}

function compileJS() {
    return src(['src/assets/js/**'])
        .pipe(minify())
        .pipe(dest('dist/assets/js'));
}

function compileSass() {
    return src('src/assets/css/**')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist/assets/css'));
}

function watchTask() {
    watch(["src/**"], { interval: 1000 }, parallel(runList));
}

exports.default = series(parallel(runList), watchTask);
exports.build = series(parallel(runList));