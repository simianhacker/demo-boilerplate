define(['page'], function (page) {

  var middleware = [];
  var initalizers = [];

  page.init = function (path) {
    initalizers.push(path);
  };

  page.use = function (route, path) {
    if (arguments.length === 1) {
      middleware.push(route);
    } else {
      page.add(route, path);
    }
  };

  // This function will add routes so we can support ondemand routing.
  page.add = function (route, path) {
    
    if(arguments.length == 2) {
      route = arguments[0];
      path = arguments[1];
    } else {
      path = arguments[0];
      route = "*";
    }

    page(route, function (ctx) {
      // Merge the middleware, initalizers and path togeather so the global 
      // middleware will be loaded before the paths.
      var paths = initalizers.concat(middleware.concat([path]));
      // Since we only want to run the initializers once we will empty it.
      initalizers = [];
      // Async load the paths
      require(paths, function() {
        // Create an array out of the middleware and controllers
        var fns = Array.prototype.slice.call(arguments);
        // Create the recursive next function
        var next = function () {
          // Shift the first function off the middleware/controller stack
          var fn = fns.shift();
          // If there are no more functions then stop the itteration
          if (!fn) return;
          // Call the function with the context and the next itterator
          fn(ctx, next);
        };
        // Start the routing
        next();
      });
    });

  };


  return page;

});
