
(function () {
    function setHtml(path, view, field, selector){
        if(!selector) selector = '#template-main';
        if(!field) field = 'contents';
        $.get(path, function(data){
            var content = {};
            content[field] = data;
            view.$el.html(_.template($(selector).html())(content));
        });
        return view;
    }
    function setPageBackgroundImage(){

    }
    var appModel = Backbone.Model.extend({
            defaults: {
                contents: 'Some contents model'
            },
            initialize: function () {
                //console.log('Model here', this);
            }
        }),
        homeView = Backbone.View.extend({
            el: '#scene',
            initialize: function () {
                //console.log('homeView');
            },
            render: function () {
                //console.log('Home, this', this);
                return setHtml('contents/home.html', this);
            }
        }),
        tracksView = Backbone.View.extend({
            el: '#scene',
            initialize: function () {
                //console.log('tracksView');
            },
            render: function () {
                //console.log('Tasks, this', this);
                return setHtml('contents/tracks.html', this);
            }
        }),
        aboutView = Backbone.View.extend({
            el: '#scene',
            initialize: function () {
                //console.log('aboutView');
            },
            render: function () {
                //console.log('About, this', this);
                return setHtml('contents/about.html', this);
            }
        }),
        contactView = Backbone.View.extend({
            el: '#scene',
            initialize: function () {
                //console.log('contactView');
            },
            render: function () {
                //console.log('Contact, this', this);
                return setHtml('contents/contact.html', this);
            }
        }),
        model = new appModel(),
        config = {
            routes: [
                ['', homeView],
                ['home', homeView],
                ['tracks', tracksView],
                ['about', aboutView],
                ['contact', contactView]
            ],
            handlers:{}
        },
        // router here
        AppRouter = Backbone.Router.extend({
            routes: (function(){
                var routes = {}, view, run;
                _.each(config.routes, function(route){
                    config.handlers[route[0]] = new route[1]({model:model});
                    //console.log({view: view, run: run});
                    routes[route[0]] = function (){ config.handlers[route[0]].render.call(config.handlers[route[0]]); }
                }); console.log('routes', routes);
                return routes;
            })()
        }),
        router = new AppRouter();
    Backbone.history.start();
})();