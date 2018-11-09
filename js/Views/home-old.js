var homeView = Backbone.View.extend({
    el: '#scene',
    initialize() {
    },
    render() {
        setPageBackgroundImage('home', {'background-size':'contain', opacity: '1'});
        return setHtml('home', this);
    }
});
        