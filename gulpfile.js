var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var uglify = require('gulp-uglify');
// 压缩 public 目录 css
gulp.task('minify-css', function() {
  return gulp.src('./public/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./public'));
});
// 压缩 public 目录 html
gulp.task('minify-html', function() {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
      removeComments: true,//清除 HTML 注释
      collapseWhitespace: true,//压缩 HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input /
      removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true,//删除 <script> 的 type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除 <style> 和 <link> 的 type="text/css"
      minifyJS: true,//压缩页面 JS
      minifyCSS: true,//压缩页面 CSS
      minifyURLs: true,
    }))
    .pipe(gulp.dest('./public'))
});
// 压缩js文件
gulp.task('minify-js', function() {
    return gulp.src(['./public/**/.js','!./public/js/**/*min.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});
// 执行 gulp 命令时执行的任务
// gulp 4.0 适用的方式
gulp.task('build', gulp.parallel('minify-html', 'minify-css', 'minify-js'
 //build the website
));