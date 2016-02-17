

export default {

  options: {

    transform: [

      ['babelify', {
        optional: [
          'es7.classProperties',
          'es7.decorators',
        ]
      }],

      'yamlify',
      'jadeify',

    ],

    watch: true,

    browserifyOptions: {
      debug: true
    }

  },

  graves: {
    src: '<%= src.js %>/src/index.js',
    dest: '<%= dist.js %>/graves.js'
  },

};
