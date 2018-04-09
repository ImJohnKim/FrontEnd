
var gulp = require("gulp"),
  watch = require("gulp-watch"),
  postcss = require("postcss"),
  imported = require("postcss-import"),
  nested = require("postcss-nested"),
  simplevar = require("postcss-simple-vars"),
  autoprefixer = require("autoprefixer"),
  browsersync = require("browser-sync").create();

gulp.task("watch", function() {
  browsersync.init({
    server: { 
        notify:false,
        baseDir: 'app' ,
    },
  });
  watch("/index.html", function() {
    browsersync.reload();
  });
  watch("./app/resources/css/**/*.css", function() {
   gulp.start('style');
  });
  watch("./app/vendors/css/*.css", function() {
    gulp.start("styles2");
  });
});


gulp.task("style", function() {
  return gulp
    .src("./app/resources/css/style.css")
    .pipe(postcss([nested, autoprefixer, imported, simplevar]))
    .pipe(browsersync.stream())
    .pipe(gulp.dest("./app/temp/css/"));
});

gulp.task("styles2", function() {
    return gulp
      .src("./app/venodrs/css/style.css")
      .pipe(postcss([nested, autoprefixer, imported, simplevar]))
      .pipe(browsersync.stream())
      .pipe(gulp.dest("./app/temp/vendors/css/"));
  });