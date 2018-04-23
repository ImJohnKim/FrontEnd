
var gulp = require("gulp"),
  watch = require("gulp-watch"),
  postcss = require("gulp-postcss"),
  imported = require("postcss-import"),
  mixins = require('postcss-mixins'),
  nested = require("postcss-nested"),
  simplevar = require("postcss-simple-vars"),
  autoprefixer = require("autoprefixer"),
  browsersync = require("browser-sync").create();

gulp.task("watch", function() {
  browsersync.init({
    server: { 
        notify:false,
        baseDir: 'app',
    },
  });
  watch("./app/index.html", function() {
    browsersync.reload();
  });
  watch("./app/resources/css/**/*.css", function() {
   gulp.start('cssInject');
  });
  watch("./app/vendors/css/*.css", function() {
    gulp.start("styles2");
  });
});
gulp.task('cssInject',['style'],function(){
return gulp.src('./app/temp/css/style.css').pipe(browsersync.stream());
});

gulp.task("style", function() {
  return gulp
    .src("./app/resources/css/style.css")
    .pipe(postcss([imported,autoprefixer, simplevar,mixins,nested]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest("./app/temp/css/"));
});

gulp.task("styles2", function() {
    return gulp
      .src("./app/venodrs/css/style.css")
      .pipe(postcss([imported,simplevar, mixins,nested,autoprefixer ]))
      .pipe(gulp.dest("./app/temp/vendors/css/"));
  });