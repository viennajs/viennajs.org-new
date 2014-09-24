/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function (grunt) {

  grunt.config.set('browserify', {
    dev: {
      options: {
        browserifyOptions: {
          bundleExternal: true,
          debug: true,
          detectGlobals: true,
          basedir: './',
          fullPaths: false
        },
        transform: [
          'reactify'
        ],
        watch: false,
        keepAlive: false
      },
      src: './assets/js/app.js',
      dest: '.tmp/public/js/app.js'
    },
    prod: {
      options: {
        browserifyOptions: {
          bundleExternal: true,
          debug: false,
          detectGlobals: true,
          basedir: './',
          fullPaths: false
        },
        transform: [
          'reactify'
        ],
        watch: false,
        keepAlive: false
      },
      src: './assets/js/app.js',
      dest: '.tmp/public/js/app.js'
    }
  });

  grunt.loadNpmTasks('grunt-browserify');

};
