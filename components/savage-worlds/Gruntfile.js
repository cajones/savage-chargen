module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            target: {
                rjsConfig: './config.js',
                options: {
                    baseUrl: 'src'
                }
            }
        },
        browserify: {
          compile: {
            files: {
              'savage.js': ['src/**/*.js'],
            },
            options: {
              transform: []
            }
          },
          minify: {
            files: {
              'savage.min.js': ['src/**/*.js'],
            },
            options: {
              transform: ['uglifyify']
            }
          }
        },
        mochaTest: {
          test: {
            options: {
              reporter: 'spec'
            },
            src: ['tests/specs/**/*.js']
          }
        }
    });

    grunt.registerTask('test',['mochaTest']);
    grunt.registerTask('build',['browserify']);
};