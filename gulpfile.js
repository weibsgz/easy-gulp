//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'); //本地安装gulp所用到的地方
var fileinclude  = require('gulp-file-include');  //包含HTML
var connect = require('gulp-connect'); //本地服务
var imagemin = require('gulp-imagemin'); //图片压缩
var watch = require('gulp-watch'); //监听
var less = require('gulp-less');
var notify = require('gulp-notify');  //处理LESS错误
var plumber = require('gulp-plumber'); //处理LESS错误
var browserSync = require('browser-sync');
var reload = browserSync.reload;


//include html并刷新服务
gulp.task('fileinclude', function(done) {
    gulp.src(['src/html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('src/page'))
        .on('end', done)
        .pipe(reload({ stream: true }))
});


gulp.task('testLess', function () {
    gulp.src('src/css/*.less')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest('src/css'))
});


// 监视文件改动并重新载入
gulp.task('serve', function() {
    browserSync({
        port: 9000,
        server: {
            baseDir: 'src/'
        }
    });
});

//监听所有HTML JS CSS改动
gulp.task('watch', function () {
   // gulp.watch(['src/css/*','src/css/*.less','src/html/*.html','src/js/*','src/images/*'], ['testLess','jstodist','csstodist','fileinclude','imagemin']);
    gulp.watch(['src/css/*.less'], ['testLess']);
    gulp.watch(['src/html/**/*.html'], ['fileinclude']);   
    gulp.watch("src/**/*.*").on('change', browserSync.reload); 
    
});




gulp.task('default',['testLess','fileinclude','serve','watch']);