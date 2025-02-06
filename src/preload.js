const { contextBridge, ipcRenderer } = require('electron');

// Expondo a função countWeeksInYear para o renderer process via IPC
contextBridge.exposeInMainWorld('api', {
  countWeeksInYear: (year) => ipcRenderer.invoke('count-weeks', year),
});
