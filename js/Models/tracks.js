const tracksModel = Backbone.Model;

    const modelTracks = new tracksModel({
        // load files list
        tracks() {
            const deferred = new $.Deferred();
            $.get('contents/tracks/tracks.json', tracks => {
                deferred.resolve(tracks);
            });
            return deferred.promise();
        },
        // load file
        loadTrack(track) {
            const deferred = new $.Deferred();
            $.get('contents/tracks/' + track + '.mp3', trackMp3 => {
                deferred.resolve(trackMp3);
            });
            return deferred.promise();
        }
    });
