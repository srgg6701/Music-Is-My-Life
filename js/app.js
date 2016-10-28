
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
        // router here
        AppRouter = Backbone.Router.extend({
            routes: {
                '': 'homeRoute',
                'home': 'homeRoute',
                'tracks': 'tracksRoute',
                'about': 'aboutRoute',
                'contact': 'contactRoute'
            },
            homeRoute: function () {
                view_home.render();
            },
            tracksRoute: function () {
                view_tracks.render();
            },
            aboutRoute: function () {
                view_about.render();
            },
            contactRoute: function () {
                view_contact.render();
            }
        }),
        model = new appModel(),
        view_home = new homeView({model:model}),
        view_tracks = new tracksView({model:model}),
        view_about = new aboutView({model:model}),
        view_contact = new contactView({model:model}),
        router = new AppRouter();
    Backbone.history.start();
})();