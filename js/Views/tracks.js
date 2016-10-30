var tracksView = Backbone.View.extend({
    el: '#scene',
    events:{
        'click #tracks-box > [data-src]': function(event){
            this.playTrack(event);
        }
    },
    initialize: function () {
    },
    render: function () {
        setPageBackgroundImage('tracks', {'background-size':'cover', opacity: "0.3"});
        //console.log('Tasks', {model:this.model});
        var html = setHtml('tracks', this),
            Model = this.model,
            loadTrack = Model.get('loadTrack'),
            tracksBox = html.$el[0],
            tracksToPlay = {}/*,
            tmpl = _.template($('').html()*/;

            //view.$el.html(_.template($(selector).html())(content));
        this.tracks = Model.get('tracks')().then(function(tracks){
            var $trackBoxContainer = $(tracksBox).find('#tracks-box');
            //console.log({ tracks: tracks, html: html, $trackBoxContainer: $trackBoxContainer });
            _.each(tracks, function(track){
                tracksToPlay[track] =  { html: $('<div/>').attr('data-src', track).text('loading...') };
                $trackBoxContainer.append(tracksToPlay[track].html);
                loadTrack(track).then(function(trackContent){
                    tracksToPlay[track].contents = trackContent;
                    //console.log('track '+track+' is downloaded...');
                    tracksToPlay[track].html.text(track.replace('_', ' '));
                }, function(){});
            });
        }, function(){
            console.warn('Cannot get tracks...');
        });

    },
    playTrack: function(event){
        //console.log('event', event.target.dataset['src']);
        var $audioPlayer = $('#audio-player'), track_src = event.target.dataset['src'];
        $audioPlayer.attr('src', '/contents/tracks/'+track_src+'.mp3');
        $audioPlayer[0].play();
        $('#track-title').text(track_src.replace('_', ' '));
    }
});