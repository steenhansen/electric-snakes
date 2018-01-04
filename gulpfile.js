
// $ gulp

const gulp = require('gulp')
const moment = require('moment')
const path = require('path')
const uglify = require('gulp-uglify-es').default
const exec = require('child_process').exec
const del = require('del')
const gutil = require('gulp-util')
const webpack = require('webpack')
const webpackConfiguration = require('./webpack.config.js')
const touch = require("touch")
const watch = require('gulp-watch')
const redColor =gutil.colors['bgRed']
const redGreen =gutil.colors['bgGreen']
const clean = require('gulp-clean')
const { spawn } = require('child_process')
var gulpTslint  = require("gulp-tslint")
var tslint = require("tslint");

// run_watch uses AUTO_START_WATCH_RUN to start initial running of webserver, before any watch changes
// ts_watch uses AUTO_START_WATCH_RUN to start initial webpack compile, before any watch changes
const AUTO_START_WATCH_RUN = 2000   

function autoStartHtml(){
  var start_server_after_watch =function () {
    touch(__dirname + '/html/_start_watch_immediately_.html')
  }
  setTimeout(start_server_after_watch, AUTO_START_WATCH_RUN)
  const watch_htmls = pathResolve('/html/*.html')
  return watch_htmls
}

// $ tsc
function compile_typescript_1 (cb) {
  exec('tsc -p ./tsconfig.json', function (err, stdOut, stdErr) {
    console.log(stdOut)
    if (err){
      cb(err)
    } else {
      cb()
    }
  })
}

function pathResolve(relative_path){
 return path.resolve(__dirname  + relative_path)
}

function move_to_javascript_2 (cb) {
  const commons_source = pathResolve('/typescript/**/*.js')
  const commons_dest = pathResolve('/javascript/')
  return gulp.src(commons_source)
  .pipe(gulp.dest(commons_dest))
  cb()
}

// $ webpack
function webpack_3 (cb) {
  const compiler = webpack(webpackConfiguration)
  compiler.run((err_ignored, stats_ignored) => {
    // console.log(err_ignored, stats_ignored)
    cb()
  })
}

function compress_4 (cb) {
  if (process.env.NODE_ENV === 'development') {
    cb()
  } else {
    console.log(redColor('compressing /public/ js files'))
    const commons_dest = pathResolve('/public/')
    const commons_source = commons_dest + '/*.*.js'
    return gulp.src(commons_source)
    .pipe(uglify())
    .pipe(gulp.dest(commons_dest))
  }
}

function delete_javascript_5 (cb) {
  const typescript_source = pathResolve('/typescript/**/*.js')
  return gulp.src(typescript_source, {read: false})
  .pipe(clean())
}

function finished_time_6(cb){
  cb()
  const hh_mm_ss = '++++ finished compile at ' + moment().format('hh:mm:ss')
  console.log(redGreen(hh_mm_ss))
}

// $ npm start
function run_webserver (cb) {
  var package_json = require('./package.json')
  var script_start =  package_json.scripts.start
  let[node_cmd, start_js_file] = script_start.split(' ')
  const web_server = spawn('node', [start_js_file])
  web_server.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  web_server.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
  })

}

gulp.task('default', function (cb) {
  console.log('')
  console.log('  To compile all and run from scratch: ')
  console.log('    1 "$ gulp build"   ')
  console.log('    2 "$ npm start"    ')
  console.log('')
  console.log('  To develop with watches: ')
  console.log('    1 "$ tsc -w"             for auto typescript compiling')
  console.log('    2 "$ gulp ts_watch"      for auto webpack compiling')
  console.log('    3 "$ gulp run_watch"     for auto web-server starting')
  console.log('    4 "$ gulp tslint_watch"  for auto tslinting')
  console.log('')
  console.log('  To develop with-out watches: ')
  console.log('    1 "$ tsc"                    for typescript compiling')
  console.log('    2 "$ gulp webpack_js"        for webpack compiling')
  console.log('    3 "$ tslint -c tslint.json"  for a tslint')
  console.log('    4 "$ npm start"              for starting web-server')
  console.log('    5 "$ npm test"               for starting web-server in test mode, SNAKE_TEST_CONFIG ')
  console.log('')
  cb()
})

gulp.task('build', gulp.series(compile_typescript_1, move_to_javascript_2, webpack_3, compress_4, delete_javascript_5, finished_time_6))

gulp.task('webpack_js', gulp.series(                 move_to_javascript_2, webpack_3, compress_4, delete_javascript_5, finished_time_6))

// TYPECSRIPT - $ tsc -w   

// WEBPACK - gulp ts_watch      
gulp.task('ts_watch', function() {
  const watch_new_compiled_js = pathResolve('/typescript/**/*.js')
  var auto_start_html =autoStartHtml()
  gulp.watch([watch_new_compiled_js, auto_start_html], gulp.series('webpack_js'))
})

//  NPM START - gulp run_watch 
gulp.task('run_app', gulp.series(run_webserver))

gulp.task('run_watch', function(cb) {
  const watch_public_js = pathResolve('/javascript/**/*.js')
  var auto_start_html =autoStartHtml()
  gulp.watch([watch_public_js, auto_start_html], gulp.series('run_app'))         
})

// TSLINT - gulp tslint_watch
gulp.task("run_tslint", (cb) =>{
  var program = tslint.Linter.createProgram("./tsconfig.json")
  gulp.src("typescript/**/*.ts")
      .pipe(gulpTslint ({ program }))
      .pipe(gulpTslint.report({allowWarnings: true, emitError: false}))
  cb()
  }
)

gulp.task('tslint_watch', function(cb) {
  const watch_public_ts = pathResolve('/typescript/**/*.ts')
  var auto_start_html =autoStartHtml()
  gulp.watch([watch_public_ts, auto_start_html], gulp.series('run_tslint'))       
})
