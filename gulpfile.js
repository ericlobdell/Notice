var gulp = require("gulp"),
    minifyCss = require("gulp-minify-css"),
    sass = require("gulp-sass"),
    watch = require("gulp-watch"),
    rename = require("gulp-rename" ),
    concat = require("gulp-concat" ),
    uglify = require("gulp-uglify" ),
    to5 = require('gulp-6to5'),
    livereload = require("gulp-livereload"),
    karma = require('karma').server;

gulp.task("css", function () {
    gulp.src("./css/notice.css")
        .pipe(minifyCss({keepBreaks:false}))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(livereload());
});

gulp.task("sass", function () {
    gulp.src(["./sass/*.sass", "./sass/lib/notice.sass"])
        .pipe(sass())
        .pipe(gulp.dest("./css"));
});

gulp.task("build-js", function () {
    gulp.src("./js/src/*.js")
        .pipe(concat("notice.js"))
        .pipe(to5())
        .pipe(gulp.dest("./dist/js"))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./dist/js"));
});

gulp.task('karma', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});

gulp.task("reload", function (  ) {
    gulp.src("./examples/**/*.html").pipe(livereload());
});

gulp.task("watch", function () {
    var server = livereload();

    gulp.watch("./css/basis.css", ["css"]);
    gulp.watch("./sass/**/*.sass", ["sass"]);
    gulp.watch("./js/src/**/*.js", ["build-js"]);
    gulp.watch("./examples/**/*.html", ["reload"]);
});

gulp.task("default", function() {
    gulp.start(["sass", "css", "build-js", "watch"]);
});