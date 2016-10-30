var contactView = Backbone.View.extend({
    el: '#scene',
    initialize: function () {
    },
    render: function () {
        //console.log('Contact, this', this);
        setPageBackgroundImage('contact', {'background-size':'cover', opacity: "0.3"});
        return setHtml('contact', this);
    }
});