'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            target: {
                src: ['index.js', 'Gruntfile.js', 'test/*.js']
            }
        },
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
                tasks: ['eslint', 'mochaTest']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-eslint');

    // Default task.
    grunt.registerTask('default', ['eslint', 'mochaTest']);

};
