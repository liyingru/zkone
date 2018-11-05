var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');

var url = require('url');
var path = require('path');
var fs = require('fs');
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('change', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})
gulp.task('server', function() {
    gulp.src('./src')
        .pipe(server({
            port: '8080',
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                }
                if (pathname === '/api/index') {

                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});

gulp.task('dev', gulp.series('sass', 'server', 'change'));