"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var rename = require("gulp-rename");
var run = require("run-sequence");
var del = require("del");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");

var tinypng = require("gulp-tinypng");
var TINYPNG_API_KEY = "..."; // можно получить в ЛК tinypng.com

// Настройки сервера
var serverConfig = {
  ui: false,
  server: "build/",
  port: 8080,
  notify: false,
  open: false,
  cors: true
};

// Конкатенирует стили и преобразует их в css формат
// В итоге получаем 2 файла обычный css и минифицированный
// Минифицированный подключаем в html документе
gulp.task("style", function () {
  return gulp.src("source/sass/index.scss")
    .pipe(plumber())
    .pipe(sass({
      includePaths: require("node-normalize-scss").includePaths
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream())
});

// Запускает сервер и
// наблюдает за изменением файлов
gulp.task("watch", function () {
  server.init(serverConfig);

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html", server.reload]);
  gulp.watch("source/js/*.js", ["js", server.reload]);
});

// Оптимизирует картинки
gulp.task("images", function () {
  return gulp.src(["source/img/**/*.{png,jpg,jpeg,svg}", "!source/img/icons/*"])
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

// Более тщательная оптимизация изображений,
// после выполнения команды следует проверить качество полученных изображений
gulp.task("tinypng", ["images"], function () {
  return gulp.src("build/img/**/*.{png,jpg,jpeg}")
    .pipe(tinypng(TINYPNG_API_KEY))
    .pipe(gulp.dest("build/img/tinypng-compress"));
});

// Преобразует изображения в оптимальный формат для Google Chrome
gulp.task("webp", function () {
  return gulp.src("build/img/**/*.{png,jpg,jpeg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

// Собирает все svg иконки из папки icons в спрайт
gulp.task("svg-sprite", function () {
  return gulp.src("source/img/icons/*.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("icons-sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

// Собирает html файлы
gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(gulp.dest("build"))
});

// Собирает js файлы
gulp.task("js", function () {
  return gulp.src(["source/js/*.js"], {base: "source"})
    .pipe(gulp.dest("build"))
});

// Копирует остальные файлы
gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/js/*.js"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

// Очищает папку прода
gulp.task("clean", function () {
  return del("build");
});

// Собирает проект
gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "svg-sprite",
    "html",
    "images",
    "webp",
    done
  );
});
