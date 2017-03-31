"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var cheerio = require("gulp-cheerio");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var rename = require("gulp-rename");



gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

gulp.task("sprite", function() {
  return gulp.src("img/icons/*.svg")
    .pipe(svgmin())
    .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
    .pipe(svgstore({
      inlineSvg: true
    }))

    .pipe(rename("icons-sprite2.svg"))
    .pipe(gulp.dest("img"));

});
