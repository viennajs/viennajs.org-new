module.exports = function (grunt) {
  grunt.registerTask('default', ['compileAssets', 'browserify:dev', 'linkAssets', 'watch']);
};
