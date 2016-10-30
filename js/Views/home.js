var homeView = Backbone.View.extend({
    el: '#scene',
    initialize: function () {
    },
    render: function () {
        //console.log('Home, this', this);
        setPageBackgroundImage('home', {'background-size':'contain', opacity: '1'});
        return setHtml('home', this);
    }
});
        