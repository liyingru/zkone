var gulp = require('gulp');
//编插件
var sass = require('gulp-sass');
//启服务插件
var server = require('gulp-webserver');
//压缩插件
var uglify = require('gulp-uglify');

var url = require('url');
var path = require('path');
var fs = require('fs');

//编译scss
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

//监听scss变化
gulp.task('change', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})

//压缩输出至项服务器目录（dist）
gulp.task('uglify', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})


//启动gulp服务器
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

//监听源文件变化
gulp.task('dev', gulp.series('sass', 'server', 'change'));