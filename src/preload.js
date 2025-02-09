const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  countWeeksInYear: (year) => ipcRenderer.invoke('count-weeks', year),
  countDaysInYear: (year) => ipcRenderer.invoke('count-days', year),
  firstDayYear: (year) => ipcRenderer.invoke('first-day', year),
  lastDayYear: (year) => ipcRenderer.invoke('last-day', year),
  getRotinas: () => ipcRenderer.invoke('get-rotinas'),
  addRotina: (nome, descricao, frequencia) => ipcRenderer.invoke('add-rotina', nome, descricao, frequencia),
  deleteRotina: (nome) => ipcRenderer.invoke('delete-rotina', nome),
});
