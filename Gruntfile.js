module.exports = function(grunt) {

  grunt.initConfig({
    comments: {
      js: {
        options: {
            singleline: true,
            multiline: true
        },
        src: [ 'public/javascripts/vendor.js'],
      },
    },
    concat: {
      vendor: {
        options: {
          separator: ';',
        },
        files: {
          'public/javascripts/vendor.js': [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-bootstrap/dist/ui-bootstrap.min.js',
            'node_modules/angular-bootstrap/dist/ui-bootstrap-tpls.min.js',
          ],
          'public/stylesheets/vendor.css': ['node_modules/bootstrap/dist/css/bootstrap.min.css']
        }
      },
      build: {
        files: {
          'public/stylesheets/build.css': ['public/stylesheets/style.css'],
        }
      }
    }
  })

  // TODO: ADD Watch Task when Building more js
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-stripcomments');
};