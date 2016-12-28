var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

// --

var errorHandler = function (err) {
    console.log(err.message);
    this.emit('end');
}

gulp.task('styles', () => {
    return gulp.src('assets/sass/app.scss')
        .pipe(plumber({ errorHandler }))
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'IE 11'] }))
        .pipe(cleancss())
        .pipe(gulp.dest('assets/css'))
        .pipe(livereload())
        .pipe(notify({
            'title': 'wheretoskate!',
            'message': 'SCSS == Done!'
        }));
});

gulp.task('html', () => gulp.src(['*.html']).pipe(livereload()));

// --

gulp.task('watch', ['styles'], () => {
    livereload.listen();
    gulp.watch(['./assets/sass/**/*.scss'], ['styles']);
    gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['styles', 'scripts']);
