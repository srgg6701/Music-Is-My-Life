const tracksView = Backbone.View.extend({
    el: '#scene',
    events: {
        'click #tracks-play_all'(event) {
            const checkbox = event.target,
                $track = config.getTracksBox().find(`[${config.data.src}]`).eq(0);
            if (checkbox.checked) {
                let $nextTrack;
                config.getAudioPlayer().on('ended', () => {
                    let dataTrack = config.getAudioPlayer().data(config.data.track);
                    if (!dataTrack) {
                        dataTrack = $track.attr(config.data.src);
                    }
                    $(`[${config.data.src}="${dataTrack}"]`).next().trigger('click');
                });
                $track.trigger('click');
            } else {
                config.getAudioPlayer().off('ended');
            }
        }
    },
    initialize() {
        const _this = this;
        $('#scene').on('click', `[${config.data.src}]`,event => {
            _this.playTrack(event);
        });
    },
    render() {
        setPageBackgroundImage('tracks', { 'background-size': 'cover', opacity: "0.3" });
        //console.log('Tasks', {model:this.model});
        var html = setHtml('tracks', this),
            Model = this.model,
            loadTrack = Model.get('loadTrack'),
            tracksBox = html.$el[0],
            tracksToPlay = {};

        this.tracks = Model.get('tracks')().then(function (tracks) {
            var $trackBoxContainer = $(tracksBox).find('#tracks-box');
            //console.log({ tracks: tracks, html: html, $trackBoxContainer: $trackBoxContainer });
            _.each(tracks, function (track) {
                tracksToPlay[track] = { html: $('<div/>').attr(config.data.src, track).text('loading...') };
                $trackBoxContainer.append(tracksToPlay[track].html);
                loadTrack(track).then(function (trackContent) {
                    tracksToPlay[track].contents = trackContent;
                    console.log('track ' + track + ' is downloaded...');
                    tracksToPlay[track].html.text(track.replace(/_/g, ' '));
                }, function () { });
            });
        }, function () {
            console.warn('Cannot get tracks...');
        });

    },
    playTrack(event) {
        const trackLink = event.target,
            activeClass = config.classes.active;
        let track_src = $(trackLink).attr(config.data.src);
        $(`.${activeClass}`).removeClass(activeClass);
        trackLink.classList.add(activeClass);
        //console.log('event', trackLink.dataset['src']);
        config.getAudioPlayer()
            .attr('src', 'contents/tracks/' + track_src + '.mp3')
            .data(config.data.track, track_src);
        config.getAudioPlayer()[0].play();
        $('#track-title').text(track_src.replace('_', ' '));
    }
});