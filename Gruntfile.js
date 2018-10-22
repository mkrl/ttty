module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      target: {
        src : "<%= pkg.name %>.css",
        dest : "build/<%= pkg.name %>.min.css"
      }
    },
    jshint: {
      files: ['Gruntfile.js', '<%= pkg.name %>'],
      options: {
          esnext: true
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>\n<%= pkg.homepage %>\n<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.name %>',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['jshint','uglify', 'cssmin']);
};