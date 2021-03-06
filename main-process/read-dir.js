var fs = require('fs');
const { ipcMain } = require('electron');

// Attach listener in the main process with the given ID
ipcMain.on('get-files', (event, path) => {
    fs.readdir(path, parseFiles.bind(this, event, path));
});

// Parse files from directory
function parseFiles(event, path, err, items) {
    let newItems = filterItems(items);
    event.sender.send('put-files', { folder: path, files: newItems });
}

// Filter only mp3 files
function filterItems(items) {
    const extReg = /(?:\.([^.]+))?$/;
    return items.filter((fileName) => {
        return extReg.exec(fileName)[1] === 'mp3';
    })
}