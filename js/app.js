
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
                //console.log()
                return setHtml('contents/home.html', this);
            }
        }),
        tracksView = Backbone.View.extend({
            el: '#scene',
            initialize: function () {
                //console.log('tracksView');
            },
            render: function () {
                return setHtml('contents/tracks.html', this);
            }
        }),
        aboutView = Backbone.View.extend({
            el: '#scene',
            initialize: function () {
                //console.log('aboutView');
            },
            render: function () {
                return setHtml('contents/about.html', this);
            }
        }),
        contactView = Backbone.View.extend({
            el: '#scene',
            initialize: function () {
                //console.log('contactView');
            },
            render: function () {
                return setHtml('contents/contact.html', this);
            }
        }),
        model = new appModel(),
        /*view_home = new homeView({model:model}),
        view_tracks = new tracksView({model:model}),
        view_about = new aboutView({model:model}),
        view_contact = new contactView({model:model}),*/
        config = {
            routes: [
                ['', homeView/*,        view_home.render*/],
                ['home', homeView/*,    view_home.render*/],
                ['tracks', tracksView/*,  view_tracks.render*/],
                ['about', aboutView/*,   view_about.render*/],
                ['contact', contactView/*, view_contact.render*/]
            ]
        },
        // router here
        AppRouter = Backbone.Router.extend({
            routes: (function(){
                var routes = {}, view;
                _.each(config.routes, function(route){
                    view = new route[1]({model:model});
                    routes[route[0]] = function(){ view.render(); }
                }); console.log('routes', routes);
                return routes;
            })()/*{
             '': 'homeRoute',
             'home': 'homeRoute',
             'tracks': 'tracksRoute',
             'about': 'aboutRoute',
             'contact': 'contactRoute'
             }*/
        }),
        router = new AppRouter();
    Backbone.history.start();
})();