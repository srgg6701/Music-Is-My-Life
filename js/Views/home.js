const dataSrc = 'data-src';
const activeClass = config.classes.active
//
const getTrackPath = track_src => `contents/tracks/${track_src}.mp3`;
const convertSeparator = string => string.replace(/_/g, ' ');

const homeView = Backbone.View.extend({
    el: '#scene',
    initialize() {

        // console.log('this.el', { el: this.el, $el: this.$el });
        //
        let cnt = 0;

        const intv = setInterval(() => {

            cnt++;

            const $getTracksBox = $('#tracks-box');
            const $audioPlayer = $('#audio-player');
            const $tracksPlayAll = $('#tracks-play_all');
            const audioPlayer = $audioPlayer[0];
            const extractFileName = track_src => {
                const fileName = track_src.split('/').pop()
                return convertSeparator(fileName.substr(0, fileName.lastIndexOf('.')));
            }

            if ($getTracksBox[0] && audioPlayer) {

                const rePlay = () => {
                    const selector = `[${dataSrc}="${extractFileName(audioPlayer.src)}"]`;
                    const $nextTrack = $(selector).next();
                    console.log('$nextTrack', $nextTrack);
                    // if there is the next track, play it, otherwise, play a first one
                    ($nextTrack.length
                        ? $nextTrack
                        : $initialTrackLink
                    ).trigger('click');
                };
                const setPlayerSrc = (track_src, trackLink) => {
                    $(`.${activeClass}`).removeClass(activeClass);
                    trackLink.classList.add(activeClass);
                    $audioPlayer.attr('src', getTrackPath(track_src));
                };
                const playIt = track_src => {
                    // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
                    const playPromise = audioPlayer.play();
                    // 
                    if (playPromise !== undefined) {
                        playPromise.then(result => {
                            console.log('Played!, result=>', result);
                            $('#track-title').text(`Track: ${extractFileName(track_src)}`);
                        }).catch(error => {
                            console.error(`Error: ${error.message}`);
                        });
                    }
                }
                const $initialTrackLink = $getTracksBox.find(`[${dataSrc}]`).eq(0);
                //const getFirstTrackName = () => getTrackPath($initialTrackLink.text().replace(/\s/, '_'));
                // manage loop
                $('#tracks-loop').on('click', event => {
                    audioPlayer.loop = event.target.checked;
                });

                const playTrack = event => {
                    const trackLink = event.target;
                    //console.log('event', trackLink.dataset['src']);
                    // set player src
                    // TODO: optimize
                    let track_src = $(trackLink).attr(dataSrc);
                    setPlayerSrc(track_src, trackLink);
                    playIt(track_src);
                }
                this.$el.on('click', `[${dataSrc}]`, event => {
                    playTrack(event);
                });

                $tracksPlayAll.on('click', event => {
                    // if play all tracks
                    if (event.target.checked) {
                        // if player.paused, play
                        if (audioPlayer.paused) {
                            // if current track is not reached its end, then play
                            if (audioPlayer.duration !== audioPlayer.currentTime) {
                                playIt(audioPlayer.src);
                            } else { // if it is reached its end
                                rePlay();
                            }
                        }
                    }
                });
                // if player is stopped
                $audioPlayer.on('pause', () => {
                    // if all the tracks are checked to play and the player has finished playing
                    if ($tracksPlayAll[0].checked && audioPlayer.duration === audioPlayer.currentTime) {
                        // play next of first track
                        rePlay();
                    }
                });

                clearInterval(intv);
            } else {
                console.warn('Tracks box or Audio player were not downloaded');
            }
            // stop everything if it takes too long
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

        // console.log('modelTracks', modelTracks); 
        // get tracks list
        this.tracks = modelTracks.get('tracks')().then(tracks => {
            // get tracks container
            const $trackBoxContainer = $(tracksBox).find('#tracks-box');
            // load files
            _.each(tracks, track => {
                tracksToPlay[track] = { html: $('<div/>').attr(dataSrc, track).text('loading...') };
                $trackBoxContainer.append(tracksToPlay[track].html);
                loadTrack(track).then(trackContent => {
                    tracksToPlay[track].contents = trackContent;
                    tracksToPlay[track].html.text(convertSeparator(track));
                }, () => {

                });
            });
        }
            , function () {
                console.warn('Cannot get tracks...');
            });
    }
});