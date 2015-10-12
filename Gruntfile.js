'use strict';

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    src: 'src',
    demo: 'test/demo',
    dist: 'dist'
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
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.tmp/styles/**/*.css',
          '<%= ares.src %>/**/*.html',
          '<%= ares.src %>/**/*.css',
          '<%= ares.src %>/images/**/*.{pgn,jpg,jpeg,gif,webp,svg}',
          '<%= ares.demo %>/**/*.html',
          '<%= ares.demo %>/**/*.js'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              // redirect resources under '/bower_components' and '/src' in page with the static files from base path (this file's path)
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/src',
                connect.static('./src')
              ),
              // set browser root to demo root
              connect.static(appConfig.demo)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= ares.dist %>'
        }
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
          'Gruntfile.js',
          '<%= ares.src %>/**/*.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= ares.dist %>/**/*'
          ]
        }]
      },
      server: '.tmp'
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

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', ['clean', 'concat', 'ngAnnotate:build']);

  grunt.registerTask('default', ['clean', 'concat', 'ngAnnotate:dist', 'uglify', 'cssmin']);

};
