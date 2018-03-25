const tracksModel = Backbone.Model.extend({
    defaults: {
        tracks(){
            const deferred = new $.Deferred();
            $.get('contents/tracks/tracks.json', tracks => {
                //console.log({ this: this, tracks: tracks });
                deferred.resolve(tracks);
            });
            return deferred.promise();
        },
        loadTrack(track){
            const deferred = new $.Deferred();
            $.get('contents/tracks/'+track+'.mp3', track => {
                deferred.resolve(track);
            });
            return deferred.promise();
        }
    }
});