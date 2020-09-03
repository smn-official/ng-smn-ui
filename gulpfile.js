const gulp = require('gulp');
const bump = require('gulp-bump');
const util = require('gulp-util');
const git = require('gulp-git');
const runSequence = require('run-sequence');

// Paths
const packages = ['**/package.json', '!node_modules/**/*.json', '!dist/**/*.json'];

// utils
function getVersion() {
    return require('./package.json').version
}

gulp.task('copy:scss', async () => {
    gulp.src('projects/smn-ui/src/lib/**/*.scss').pipe(gulp.dest('dist/lib/lib'))
});

gulp.task('version:bump', async () => {
    let type;

    if (util.env.patch) {
        type = 'patch'
    } else if (util.env.minor) {
        type = 'minor'
    } else if (util.env.major) {
        type = 'major'
    } else {
        throw 'You need to pass an argument(patch, minor or major) to bump the app';
    }

    return gulp.src(packages)
        .pipe(bump({ type }))
        .pipe(gulp.dest('./'))
});

gulp.task('version:tag', async () => {
    return git.tag(getVersion())
});

gulp.task('version:add', async () => {
    return gulp.src(packages)
        .pipe(git.add());
});

gulp.task('version:commit', async () => {
    return gulp.src(packages)
        .pipe(git.commit(`Automatic bumps to version ${getVersion()}`));
});

gulp.task('version:push', async () => {
    return git.push('origin', 'master', {args: " --tags"});
});

gulp.task('release', async () => {
    runSequence('version:bump', 'version:tag', 'version:add', 'version:commit', 'version:push');
});
