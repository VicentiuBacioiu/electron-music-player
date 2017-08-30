const { ipcRenderer } = require('electron');

ipcRenderer.on('put-files', (event, files) => {
    console.log(files);
});

ipcRenderer.send('get-files', "file://C:/Users/vicentiu.bacioiu/Downloads");
