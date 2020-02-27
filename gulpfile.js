const {src, dest, parallel, watch} = require('gulp')
const sass = require('gulp-sass')
const cssPrefixer = require('gulp-autoprefixer')
const sourceMaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const plumber = require('gulp-plumber')
const concat = require('gulp-concat')
const browserify = require('gulp-browserify')

const sassTask = (config) => {
  return function css () {
    return src(config.src)
      .pipe(plumber())
      .pipe(sourceMaps.init())
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(cssPrefixer('last 2 versions'))
      .pipe(sourceMaps.write('.'))
      .pipe(dest(config.dest))
      .pipe(browserSync.stream());
  }
}

const concatJsTask = (config) => {
  return function js () {
    return src(config.src)
    .pipe(plumber())
    .pipe(sourceMaps.init())
    .pipe(concat('main.js'))
    .pipe(browserify())
    .pipe(sourceMaps.write('.'))
    .pipe(dest(config.dest))
    .pipe(browserSync.stream())
  }
}

const browserSyncTask = (startPath = '/', config) => {
  browserSync.init({
    watch: true,
    startPath,
    server: {
      baseDir: './'
    },
  });

  watch(config.style.src, sassTask(config.style));
  watch(config.js.src, concatJsTask(config.js));
  if(config.img) {
    watch(config.img.src, moveTask(config.img));
  }
  if(config.html) {
    watch(config.html.src, moveTask(config.html));
  }
};

const moveTask = (config) => {
  return function move() {
    return src(config.src)
      .pipe(plumber())
      .pipe(dest(config.dest))
  }
}

const basePaths = {
  template: {
    srcBase: 'src/template/',
    destBase: 'assets/',
  },
  form: {
    srcBase: 'src/formulario/',
    destBase: 'public/assets/',
  }
}

const config = {
  template: {
    style: {
      src: `${basePaths.template.srcBase}sass/*.scss`,
      dest: `${basePaths.template.destBase}css/`,
    },
    js: {
      src: `${basePaths.template.srcBase}js/*.js`,
      dest: `${basePaths.template.destBase}js/`,
    },
    img: {
      src: `${basePaths.template.srcBase}img/*`,
      dest: `${basePaths.template.destBase}img/`,
    },
  },
  form: {
    style: {
      src: `${basePaths.form.srcBase}sass/*.scss`,
      dest: `${basePaths.form.destBase}css/`,
    },
    js: {
      src: `${basePaths.form.srcBase}js/*.js`,
      dest: `${basePaths.form.destBase}js/`,
    },
    img: {
      src: `${basePaths.form.srcBase}img/*`,
      dest: `${basePaths.form.destBase}img/`,
    },
    html: {
      src: 'index.html',
      dest: 'public/',
    },
  }
}

exports.template = parallel(
  sassTask(config.template.style),
  concatJsTask(config.template.js),
  moveTask(config.template.img),
)

exports.templateWatch = () => {
  browserSyncTask('template.html', config.template)
}

exports.form = parallel(
  sassTask(config.form.style),
  concatJsTask(config.form.js),
  moveTask(config.form.img),
  moveTask(config.form.html),
)

exports.formWatch = () => {
  browserSyncTask('/public', config.form)
}

exports.default = parallel(this.template, this.form);
