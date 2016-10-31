var tracksModel = Backbone.Model.extend({
    defaults: {
        tracks: function(){
            var deferred = new $.Deferred();
            $.get('contents/tracks/tracks.json', function(tracks){
                //console.log({ this: this, tracks: tracks });
                deferred.resolve(tracks);
            });
            return deferred.promise();
        },
        loadTrack: function(track){
            var deferred = new $.Deferred();
            $.get('contents/tracks/'+track+'.mp3', function(track){
                deferred.resolve(track);
            });
            return deferred.promise();
        }
    }
});