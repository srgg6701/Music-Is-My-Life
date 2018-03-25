config.routes = [
    ['', homeView, modelApp],
    ['home', homeView, modelApp],
    ['tracks', tracksView, new tracksModel()],
    ['about', aboutView, modelApp],
    ['contact', contactView, modelApp]
];
const AppRouter = Backbone.Router.extend({
    routes: (function () {
        var routes = {};
        _.each(config.routes, function (route) {
            config.handlers[route[0]] = new route[1]({model: route[2]});
            //console.log({view: view, run: run});
            routes[route[0]] = function () {
                config.handlers[route[0]].render.call(config.handlers[route[0]]);
            }
        }); //console.log('routes', routes);
        return routes;
    })()
});
