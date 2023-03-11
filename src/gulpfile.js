// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const gulp = require("gulp");
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const sass = require("gulp-sass")(require("sass"));
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const concat = require("gulp-concat");
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const autoprefixer = require("gulp-autoprefixer");

// Compile all SCSS files into one CSS file
gulp.task("styles", function () {
  return gulp
    .src("./stylesheets/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("styles.css"))
    .pipe(autoprefixer())
    .pipe(gulp.dest("/"));
});

// Watch for changes in SCSS files
gulp.task("watch", function () {
  gulp.watch("stylesheets/**/*.scss", gulp.series("styles"));
});

// Default task
gulp.task("default", gulp.series("styles", "watch"));
