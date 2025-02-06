const path = require('path');  // Adicione esta linha para importar o módulo 'path'
const { app, BrowserWindow, ipcMain } = require('electron');
const { countWeeksInYear } = require('./weeks'); // Certifique-se de importar corretamente o arquivo de contagem de semanas

// Resposta ao evento 'count-weeks' no main process
ipcMain.handle('count-weeks', (event, year) => {
  return countWeeksInYear(year); // Retorna o valor calculado
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    kiosk: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Agora o 'path' está sendo usado corretamente
      nodeIntegration: false, // Desative a integração do Node.js diretamente no renderer
    },
  });

  mainWindow.loadFile('src/square.html');

  mainWindow.removeMenu();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
