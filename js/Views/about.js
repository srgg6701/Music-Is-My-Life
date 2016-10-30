var aboutView = Backbone.View.extend({
    el: '#scene',
    initialize: function () {
    },
    render: function () {
        //console.log('About, this', this);
        setPageBackgroundImage('about', {'background-size':'cover', opacity: "0.3"});
        return setHtml('about', this);
    }
});