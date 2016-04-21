'use strict'

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false,
          clearRequireCache: false
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      index: {
        files: '**/*.js',
        tasks: ['mochaTest']
      }
    }
  })

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-mocha-test')

  // Default task.
  grunt.registerTask('default', ['mochaTest'])

}
