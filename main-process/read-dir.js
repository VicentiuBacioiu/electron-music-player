var fs = require('fs');
const { ipcMain } = require('electron');

// Attach listener in the main process with the given ID
ipcMain.on('get-files', (event, path) => {
    fs.readdir(path, function (err, items) {
        event.sender.send('put-files', 'items');
    });
});
