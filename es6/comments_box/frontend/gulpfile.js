const gulp = require('gulp')
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')

gulp.task('build', () => {
  return browserify({ entries: './app.jsx', extensions: ['.jsx'], debug: true })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build'))
})

gulp.task('watch', ['build'], () => {
  gulp.watch('*.jsx', ['build'])
})

gulp.task('default', ['watch'])
