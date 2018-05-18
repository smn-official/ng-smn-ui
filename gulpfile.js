const gulp = require('gulp');

gulp.task('copy:scss', () => {
    gulp.src('projects/smn-ui/src/lib/**/*.scss').pipe(gulp.dest('dist/smn-ui/lib'))
});
