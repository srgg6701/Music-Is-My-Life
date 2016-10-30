var tracksView = Backbone.View.extend({
    el: '#scene',
    initialize: function () {
    },
    render: function () {
        setPageBackgroundImage('tracks', {'background-size':'cover', opacity: "0.3"});
        console.log('Tasks', {model:this.model});
        this.tracks = this.model.get('tracks')().then(function(tracks){
            console.log('tracks', tracks);
        }, function(){
            console.warn('Cannot get tracks...');
        });
        return setHtml('tracks', this);
    }
});