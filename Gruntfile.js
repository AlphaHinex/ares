'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        src: require('./bower.json').appPath || 'src',
        dist: require('./bower.json').distPath || 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        ares: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: [
                    '<%= ares.src %>/**/*.js'
                ],
                tasks: ['newer:jshint:all']
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    '<%= ares.src %>/**/*.js'
                ]
            }
        },

        clean: {
          dist: {
            files: [{
                dot: true,
                src: [
                    '.tmp',
                    '<%= ares.dist %>/**/*'
                ]
            }]
          }
        },

        concat: {
            dist: {
                files: [{
                    '.tmp/ares.js': ['<%= ares.src %>/**/*.js'],
                    '.tmp/ares.css': ['<%= ares.src %>/**/*.css'],
                    '<%= ares.dist %>/ares.css': ['<%= ares.src %>/**/*.css']
                }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
          build: {
            src: ['.tmp/ares.js'],
            dest: '<%= ares.dist %>/ares.js'
          },
          dist: {
            src: ['.tmp/ares.js'],
            dest: '.tmp/ares.js'
          }
        },

        uglify: {
          dist: {
            files: [{
                expand: true,
                cwd: '.tmp',
                src: ['ares.js'],
                dest: '<%= ares.dist %>'
            }]
          }
        },

        cssmin: {
          dist: {
            files: {
              '<%= ares.dist %>/ares.css': [
                '.tmp/ares.css'
              ]
            }
          }
        }

    });

    grunt.registerTask('build', ['clean', 'concat', 'ngAnnotate:build']);

    grunt.registerTask('default', ['clean', 'concat', 'ngAnnotate:dist', 'uglify', 'cssmin']);

};
