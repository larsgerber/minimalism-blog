const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const { src, series, parallel, dest, watch } = require('gulp');
const runList = [copyIcons, copyLogo, copyFiles, copyAssets, compileSass]

function copyIcons() {
    return src("src/icon/**")
        .pipe(dest('dist/icon'));
}

function copyLogo() {
    return src("src/logo/**")
        .pipe(dest('dist/logo'));
}

function copyFiles() {
    return src(["src/robots.txt", "src/sitemap.xml"])
        .pipe(dest('dist/'));
}

function copyAssets() {
    return src(['src/assets/**', '!src/assets/css/**'])
        .pipe(dest('dist/assets'));
}

function compileSass() {
    return src('src/assets/css/**')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist/assets/css/'));
}

function watchTask() {
    watch(["src/**"], { interval: 1000 }, parallel(runList));
}

exports.default = series(parallel(runList), watchTask);
exports.build = series(parallel(runList));