/**
 * Created by timlv on 2016/1/8.
 */
'use strict';

var path       = require('path'),
    fs         = require('fs');
var gulp       = require('gulp'),
    uglify     = require('gulp-uglify'),
    debug      = require('gulp-debug'),
    gulpif     = require('gulp-if'),
    minifyCss  = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    clean      = require('gulp-clean'),
    less       = require('gulp-less'),
    replace    = require('gulp-replace'),
    tmod       = require('gulp-tmod'),
    rename     = require("gulp-rename"),
    tar        = require('gulp-tar'),
    inline     = require('gulp-inline-source'),
    useref     = require('gulp-useref');
var argv = require('minimist')(process.argv.slice(2));
var json = JSON.parse(fs.readFileSync('./package.json'));
var cdnDir = "enterprise";
var cdn = (argv.l?'//midas.gtimg.cn/':'//sandbox.midas.gtimg.cn/')+cdnDir+'/';
var cmd = argv._[0];
var replaceReg = /(\.[\/\.]+)(?=js|images|vendor|css)/g;
var processAddContent = function(match, rawContent) {
    return rawContent.replace(/<!--\s*([\s\S]*?)\s*-->/g, '$1');
};
var replaceAdd = replace(/<!--\s*build:add\s*-->([\s\S]*?)<!--\s*endbuild\s*-->/g, processAddContent);
gulp.task("build", ["copy","default","tmod"], function () {
    return gulp.src('view/**/*')
        .pipe(replace("@VERSION", json.version))
        .pipe(replaceAdd)
        .pipe(useref())
        .pipe(gulpif('*.js', gulpif(argv.l,uglify())))//如果是沙箱环境，则js不混淆
        .pipe(inline({compress:true}))//该插件不能识别一个已经压缩的css为path还是文件（inline-source中RE_NOT_FILEPATH正则问题）,所以必需要放在minifyCss任务前面
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulpif(argv.l,gulpif(/(.+).(html|shtml)/,minifyHtml())))
        .pipe(replace(replaceReg, cdn))//先inline, 后replace资源地址
        .pipe(gulp.dest('dist/view/'));
});
gulp.task("package",["archive:html","archive:static"]);
gulp.task('archive:html',['archive:static'],function() {
    return gulp.src("dist/view/**/*")
        .pipe(rename(function (path) {
            path.dirname = cdnDir + '/' + path.dirname;
        }))
        .pipe(tar('web.tar'))
        .pipe(gulp.dest("dist/"));
});

gulp.task('archive:static', function() {
    return gulp.src("dist/+(js|css|images|vendor)/**/*")
        .pipe(rename(function (path) {
            path.dirname = cdnDir + '/' + path.dirname;
        }))
        .pipe(tar('cdn.tar'))
        .pipe(gulp.dest("dist/"));
});
gulp.task('copy', function () {
    return gulp.src('images/**/*')
        .pipe(gulp.dest('dist/images'));
});
gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean());
});
gulp.task('default',["less:style","less:components"]);
gulp.task('less:style',function () {//转化公共样式
    return gulp.src('styles/less/*.less')
        .pipe(less())
        .pipe(replace(replaceReg, "../"))//把demo中不合理的资源地址修正
        .pipe(gulp.dest('styles/css'));
});
gulp.task('less:components',function () {//转化组件样式
    return gulp.src('components/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'styles/less') ]
        }))
        .pipe(replace(replaceReg, "../../"))//把demo中不合理的资源地址修正
        .pipe(gulp.dest('components'));
});
gulp.task('tmod', function () {
    gulp.src("discomponents/**/*.html")
        .pipe(tmod({
            combo: false,
            cache:false,
            base: 'components/',
            output: 'components/'
        }));
});