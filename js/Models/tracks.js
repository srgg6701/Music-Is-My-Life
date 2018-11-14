const tracksModel = Backbone.Model;

    const modelTracks = new tracksModel({
        // load files list
        tracks() {
            const deferred = new $.Deferred();
            $.getJSON('contents/tracks/tracks.json', tracks => {
                deferred.resolve(tracks);
            });
            return deferred.promise();
        },
        // load file
        loadTrack(track, number) {
            const deferred = new $.Deferred();
            $.get('contents/tracks/' + track + '.mp3', trackMp3 => {
                deferred.resolve({[number]: trackMp3});
            });
            return deferred.promise();
        }
    });
