const { ipcRenderer } = require('electron');
const { Howl } = require('howler/dist/howler');
ipcRenderer.on('put-files', createPlaylist);

let player;
document.getElementById('choose').addEventListener('change', fileChosen);

/**
 * Creates a playlist
 * @param {any} event - The event 
 * @param {any} files - The list of files
 */
function createPlaylist(event, data) {
    let list = document.getElementById('list');

    data.files.forEach(function (element) {
        let playFile = data.folder + '\\' + element;

        // create HTML entry
        list.innerHTML += `
            <a class="playable list-group-item" style="cursor:pointer" data-src="${playFile}" data-title="${element}">
                <span class="glyphicon glyphicon-play"></span> ${element}
            </a>`;
    });

    bindElements();
};

/**
 * Binds the elements
 */
function bindElements() {
    // bind elements to the play method
    var elements = document.querySelectorAll('.playable');
    elements.forEach(function (element) {
        element.addEventListener('click', playFile);
    });

    // bind play/pause/stop buttons
    document.getElementById('play').addEventListener('click', playButton);
    document.getElementById('pause').addEventListener('click', pauseButton);
    document.getElementById('stop').addEventListener('click', stopButton);
}

/**
 * Triggered when a file is chosen
 */
function fileChosen(){
    var file = document.getElementById('choose');
    ipcRenderer.send('get-files', file.files[0].path);
}

/**
 * Play a specific file
 * @param {any} - The event
 */
function playFile(event) {
    let source = event.currentTarget.getAttribute('data-src');
    let title = event.currentTarget.getAttribute('data-title');
    let banner = document.getElementById('nowPlaying');

    // stop existing player
    if (player) {
        player.stop();
    }

    // create new player
    player = new Howl({
        src: [source]
    });

    // start playing
    player.play();

    // set the song title on the banner
    banner.innerText = title;
}

/**
 * Play function
 */
function playButton() {
    if (player) {
        player.play();
    }
}

/**
 * Pause function
 */
function pauseButton() {
    if (player) {
        player.pause();
    }
}

/**
 * Stop function
 */
function stopButton() {
    if (player) {
        player.stop();
    }
}