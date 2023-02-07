import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import html from 'gulp-htmlmin';
import squoosh from 'gulp-libsquoosh';
import webp from 'gulp-webp';
import svgsprite from 'gulp-svgstore';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import {deleteAsync} from 'del'

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

export const htmlmin = () => {
  return gulp.src('source/*.html')
    .pipe(html({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
}

export const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(gulp.dest("build/js"))

}

 const sprite = () => {
  return gulp.src("source/img/**/*.svg")
    .pipe(svgsprite({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}

export const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.svg",
    "source/img/favicon/*.png"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done()
}

const clean = () => {
  return deleteAsync("build");
};

export const image = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//copyimage

const copyImage = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"))
}

//Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html').on('change', browser.reload);
}

export const build = gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    htmlmin,
    scripts,
    sprite,
    createWebp
  ),
);

export default gulp.series(
  clean,
  copy,
  copyImage,
  gulp.parallel(
    styles,
    htmlmin,
    scripts,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
