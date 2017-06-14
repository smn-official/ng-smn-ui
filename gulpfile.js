const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ pattern: '*' });

const paths = {
    base: 'src/app/smn-ui',
    dirTemp: 'tmp'
};

gulp.task('copy:tmp', () => {
    return gulp.src([`${paths.base}/**/*.*`, `!${paths.base}/smn-ui.module.ts`])
        .pipe(gulp.dest(paths.dirTemp))
});

gulp.task('index', () => {
    return gulp.src(`${paths.base}/smn-ui.module.ts`)
        .pipe($.rename((path) => {
            path.basename = 'index'
        }))
        .pipe(gulp.dest(paths.dirTemp))
});

gulp.task('copy:tsconfig', () => {
    return gulp.src('./tsconfig.json')
        .pipe(gulp.dest(paths.dirTemp))
});

gulp.task('copy:package', () => {
    return gulp.src('./package.json')
        .pipe(gulp.dest(paths.dirTemp))
});

gulp.task('copy:readme', () => {
    return gulp.src('./README.md')
        .pipe(gulp.dest(paths.dirTemp))
});

gulp.task('clean:dist', () => {
    return gulp.src('dist')
        .pipe($.clean());
});

gulp.task('clean:tmp', () => {
    return gulp.src(paths.dirTemp)
        .pipe($.clean());
});

gulp.task('dist', () => {
    return gulp.src(`${paths.dirTemp}/**/*.*`)
        .pipe(gulp.dest('dist'))
});
gulp.task('build', () => {
    $.runSequence('clean:dist', 'copy:tmp', 'index', ['copy:tsconfig', 'copy:package', 'copy:readme'], 'dist', 'clean:tmp');
});
