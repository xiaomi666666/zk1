var gulp = require('gulp');
var sass = require('gulp-sass');
var mincss = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var rev = require("gulp-rev");
var revCollector = require("gulp-rev-collector");
var server = require('gulp-webserver');

var data = require("./src/data/data.json");

gulp.task("css", function() {
    gulp.src("src/css/*.scss")
        .pipe(sass())
        .pipe(mincss())
        .pipe(rev())
        .pipe(gulp.dest("build/css"))
});

gulp.task("copyhtml", function() {
    gulp.src("src/*.html")
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest("build"))
});

gulp.task("js", function() {
    gulp.src("src/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/js"))
});

gulp.task("watch", function() {
    gulp.watch("src/*.html", ["copyhtml"]);
    gulp.watch("src/css/*.css", ["css"]);
    gulp.watch("src/js/*.js", ["js"]);
});

gulp.task("server", ["css", "copyhtml", "js", "watch"], function() {
    gulp.src("src")
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === "/data") {
                    res.end(JSON.stringify(data));
                    return;
                }
                next();
            }
        }))
});

gulp.task("default", ["server"]);