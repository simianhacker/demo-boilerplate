require.config({
  paths: {
    'jquery': 'vendor/jquery/jquery.min',
    'underscore': 'vendor/underscore/underscore-min',
    'backbone': 'vendor/backbone/backbone-min',
    'moment': 'vendor/moment/lang/moment.min',
    'marionette': 'vendor/marionette/core/amd/backbone.marionette.min',
    'backbone.wreqr': 'vendor/backbone.wreqr/lib/amd/backbone.wreqr.min',
    'backbone.babysitter': 'vendor/backbone.babbysitter/lib/amd/backbone.babbysitter.min',
    'page': 'vendor/page/index',
  },
  shim: {
    'page': { exports: 'page' },
    'backbone': { exports: 'Backbone', deps: ['jquery', 'underscore'] },
    'underscore': { exports: '_' }
  }
});
