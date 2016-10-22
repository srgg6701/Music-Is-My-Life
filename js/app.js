(function () {
    console.log('Start app!');
    var appModel = Backbone.Model.extend({
            defaults: {
                contents: 'Some contents model'
            },
            initialize: function () {
                //console.log('Model here', this);
            }
        }),
        appView = Backbone.View.extend({
            el: '#scene',
            /*initialize: function () { this.render(); },*/
            render: function () {
                console.trace('View render!');
                var data = {
                    contents: 'something here'
                };
                var template = $('#template-main').html();
                this.$el.html(_.template(template)(data));
            }
        }),
        AppRouter = Backbone.Router.extend({
            routes: {
                '': 'homeRoute',
                'home': 'homeRoute',
                'about': 'aboutRoute',
            },
            homeRoute: function () {
                view.render();
            },
            aboutRoute: function () {
                var aboutView = new AboutView();
                $("#content").html(aboutView.el);
            }
        }),
        model = new appModel(),
        view = new appView(),
        appRouter = new AppRouter();
    Backbone.history.start();
})();