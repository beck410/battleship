

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'app/styles',
          src: ['*.css','!*.min.css'],
          dest: 'app/dist/styles/',
          ext: '.min.css' 
        }]
      },
      // combine: {
      //   files: {
      //     'app/dist/styles/<%= pkg.name =%>---<%= pkg.version =%>.min.css': ['app/styles/min/*.min.css']
      //   }
      // }
    },

    uglify: {
      options: {
        manage: false
      },
      my_target: {
        files: {
          'app/dist/js/<%= pkg.name %<.js': ['app/js/<%= pkg.name %>.js'] 
        }
      }
    },
    
    concat: {
      options: {
        seperator: ';',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - '+ '<% grunt.template.today("yyy-mm-dd") %>' + '*/'
        },
      dist: {
        src: ['app/js/*.js'],
        dest: 'app/js/<%= pkg.name %>.js'
        }
      },

    sass: {
      options: {
        compress: false,
        sourcemap: 'none'
      },
      dist: {
        files: {
          'app/styles/<%= pkg.name %>.css': 'app/sass/*.scss'
          }  
      }
    },

    watch: {
     sass: {
      files: ['app/sass/*.scss'],
      tasks: ['sass', 'cssmin','uncss']
     }
    },

    uncss: {
      dist: {
        files: {
          'app/dist/styles/*.css': ['app/*.html']
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'app/images/',
          src: [ '*.png', '*.svg', '*.jpg' ],
          dest: 'app/dist/images'
        }]
      }
    },

    notify_hooks: {
      options: {
        enable: true,
        max_jshint_notifications: 5,
      },
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
      },
      target: ['Gruntfile.js', 'app/js/**/*.js','test/*.js']
    }
  });
  
  grunt.task.run('notify_hooks');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('css', ['sass,cssmin,uncss']);
  grunt.registerTask('production', ['sass,cssmin,uncss','uglify','imagemin']);
  
};
