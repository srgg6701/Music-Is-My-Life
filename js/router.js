const modelTracks = new tracksModel();
config.routes = [
    ['', homeView, modelTracks],
    //['', tracksView, modelTracks],
    ['home', homeView, modelTracks],
    // ['tracks', tracksView, modelTracks],
    ['about', aboutView, modelApp],
    ['contact', contactView, modelApp]
];
const AppRouter = Backbone.Router.extend({
    routes: (() =>{
        const routes = {};
        _.each(config.routes, route => {
            config.handlers[route[0]] = new route[1]({model: route[2]});
            routes[route[0]] = () => {
                config.handlers[route[0]].render.call(config.handlers[route[0]]);
            }
        });
        return routes;
    })()
});
