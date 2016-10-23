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
        homeView = Backbone.View.extend({
            el: '#scene',
            initialize: function () { console.log('homeView') },
            render: function () {
                var data = {
                    contents: `<h4 class="header-lead">Hi, Dude!</h4>
                    <p>Home, sweet home...</p>`
                };
                var template = $('#template-main').html();
                this.$el.html(_.template(template)(data));
            }
        }),
        tracksView = Backbone.View.extend({
            el: '#scene',
            initialize: function () { console.log('tracksView') },
            render: function () {
                var data = {
                    contents: `<h4 class="header-lead">Some nice tracks here</h4>
                    <p>Choose what you like</p>`
                };
                var template = $('#template-main').html();
                this.$el.html(_.template(template)(data));
            }
        }),
        aboutView = Backbone.View.extend({
            el: '#scene',
            initialize: function () { console.log('aboutView') },
            render: function () {
                var data = {
                    contents: `<h4 class="header-lead">All about the way here</h4>
                    <p>It will be really interesting!</p>`
                };
                var template = $('#template-main').html();
                this.$el.html(_.template(template)(data));
            }
        }),
        contactView = Backbone.View.extend({
            el: '#scene',
            initialize: function () { console.log('contactView') },
            render: function () {
                var data = {
                    contents: `<h4 class="header-lead">Call, write, email!</h4>
                    <p>I will give you my answer, anyway!</p>`
                };
                var template = $('#template-main').html();
                this.$el.html(_.template(template)(data));
            }
        }),
        facebookView = Backbone.View.extend({
            el: '#scene',
            initialize: function () { console.log('faceboookView') },
            render: function () {
                var data = {
                    contents: `<h4 class="header-lead">Yes, we attend there also</h4>
                    <p>Not sure, however, that it makes sense ─ to write anything here insted of redirecting to Facebook itself...</p>`
                };
                var template = $('#template-main').html();
                this.$el.html(_.template(template)(data));
            }
        }),
        youtubeView = Backbone.View.extend({
            el: '#scene',
            initialize: function () { console.log('tracksView') },
            render: function () {
                var data = {
                    contents: `<h4 class="header-lead">Youtube Channel</h4>
                    <p>Yeah... we've got that. Welcome!</p>`
                };
                var template = $('#template-main').html();
                this.$el.html(_.template(template)(data));
            }
        }),
        // router here
        AppRouter = Backbone.Router.extend({
            routes: {
                '': 'homeRoute',
                'home': 'homeRoute',
                'tracks': 'tracksRoute',
                'about': 'aboutRoute',
                'contact': 'contactRoute',
                'facebook': 'facebookRoute',
                'youtube': 'youtubeRoute'
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
            },
            facebookRoute: function () {
                view_facebook.render();
            },
            youtubeRoute: function () {
                view_youtube.render();
            }
        }),
        model = new appModel(),
        view_home = new homeView({model:model}),
        view_tracks = new tracksView({model:model}),
        view_about = new aboutView({model:model}),
        view_contact = new contactView({model:model}),
        view_facebook = new facebookView({model:model}),
        view_youtube = new youtubeView({model:model}),
        router = new AppRouter();
    Backbone.history.start();
})();