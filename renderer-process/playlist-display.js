const { ipcRenderer } = require('electron');
const { Howl } = require('howler/dist/howler');

ipcRenderer.on('put-files', createPlaylist);

ipcRenderer.send('get-files', "D:\\SkyDrive\\Music\\Alternative Rock");

function createPlaylist(event, files){
    var sound = new Howl({
        src: ["D:\\SkyDrive\\Music\\Alternative Rock\\" + files[0]]
      });
       
      sound.play();
}