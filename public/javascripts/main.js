require(['config'], function () {
  require(['utils/router'], function (router) {

    router.add('/', 'controllers/home/index');

    router.start({
      click: false,
      popstate: Modernizr.history,
      dispatch: true
    });

  });
});
