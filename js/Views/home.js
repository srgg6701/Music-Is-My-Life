const homeView = Backbone.View.extend({
    el: '#scene',
    initialize() {
        console.log('this.el', { el: this.el, $el: this.$el });
        let cnt = 0,
            intv = setInterval(() => {

                cnt++;

                const $getTracksBox = $('#tracks-box');
                const $audioPlayer = $('#audio-player');

                if ($getTracksBox[0] && $audioPlayer[0]) {

                    // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
                    const playTrack = event => {
                        const trackLink = event.target,
                            activeClass = config.classes.active;
                        let track_src = $(trackLink).attr(config.data.src);
                        $(`.${activeClass}`).removeClass(activeClass);
                        trackLink.classList.add(activeClass);
                        //console.log('event', trackLink.dataset['src']);
                        $audioPlayer
                            .attr('src', 'contents/tracks/' + track_src + '.mp3')
                            .data(config.data.track, track_src);

                        const playPromise = $audioPlayer[0].play();

                        if (playPromise !== undefined) {
                            playPromise.then(_ => {
                                // Automatic playback started!
                                // Show playing UI.
                                console.log('Played!');
                            })
                                .catch(error => {
                                    // Auto-play was prevented
                                    // Show paused UI.
                                });
                        }

                        $('#track-title').text(track_src.replace('_', ' '));
                    }
                    this.$el.on('click', `[${config.data.src}]`, event => {
                        playTrack(event);
                    });
                    //
                    /* $('#audio-play-temporal').on('click', event => {
                        $audioPlayer[0].play();
                    }); */
                    //
                    $('#tracks-play_all').on('click', event => {
                        const checkbox = event.target,
                            $getTrack = (active) => {
                                let selector = `[${config.data.src}]`,
                                    $track = $getTracksBox.find(selector).eq(0),
                                    $activeTrack;
                                if (active) {
                                    $activeTrack = $(`${selector}.${config.classes.active}`);
                                    if (!$activeTrack.length) $track.trigger('click');
                                }
                                return $track;
                            }
                        if (checkbox.checked) {
                            let $nextTrack;
                            $audioPlayer.on('ended', () => {
                                let dataTrack = $audioPlayer.data(config.data.track);
                                // no tracks were run yet
                                if (!dataTrack) {
                                    dataTrack = $getTrack().attr(config.data.src);
                                }
                                $nextTrack = $(`[${config.data.src}="${dataTrack}"]`).next();

                                if ($nextTrack.length) $nextTrack.trigger('click');
                                else if ($('#tracks-loop')[0].checked) {
                                    $getTrack().trigger('click');
                                }
                            });
                            // get active or first track, run if have no active
                            $getTrack(true);
                        } else {
                            $audioPlayer.off('ended');
                        }
                    });
                    clearInterval(intv);
                }

                if (cnt > 50) {
                    clearInterval(intv);
                    console.warn('Cannot get player...');
                }

            }, 100);

    },
    render() {
        setPageBackgroundImage('home', { 'background-size': 'contain', opacity: '1' });
        //console.log('Tasks', {model:modelTracks});
        var html = setHtml('home', this),
            loadTrack = modelTracks.get('loadTrack'),
            tracksBox = html.el,
            tracksToPlay = {};


        this.tracks = modelTracks.get('tracks')().then(function (tracks) {
            //this.tracks = this.model.get('tracks')().then(function (tracks) {
            var $trackBoxContainer = $(tracksBox).find('#tracks-box');
            //console.log({ tracks: tracks, html: html, $trackBoxContainer: $trackBoxContainer });
            _.each(tracks, function (track) {
                tracksToPlay[track] = { html: $('<div/>').attr(config.data.src, track).text('loading...') };
                $trackBoxContainer.append(tracksToPlay[track].html);
                loadTrack(track).then(function (trackContent) {
                    tracksToPlay[track].contents = trackContent;
                    //console.log('track ' + track + ' is downloaded...');
                    tracksToPlay[track].html.text(track.replace(/_/g, ' '));
                }, function () { });
            });
        }, function () {
            console.warn('Cannot get tracks...');
        });
    }
});