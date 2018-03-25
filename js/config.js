const config = {
    handlers:{}, // will be filled in the loop bellow
    $getAudioPlayer: () => $('#audio-player'),
    $getTracksBox: () => $('#tracks-box'),
    classes: {
        active: 'active'
    },
    data: {
        track: 'track',
        src: 'data-src'
    }
};
