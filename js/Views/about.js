const aboutView = Backbone.View.extend({
    el: '#scene',
    initialize() {
    },
    render() {
        setPageBackgroundImage('about', {'background-size':'cover', opacity: "0.3"});
        return setHtml('about', this);
    }
});