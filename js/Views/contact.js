var contactView = Backbone.View.extend({
    el: '#scene',
    initialize() {
    },
    render () {
        setPageBackgroundImage('contact', {'background-size':'cover', opacity: "0.3"});
        return setHtml('contact', this);
    }
});