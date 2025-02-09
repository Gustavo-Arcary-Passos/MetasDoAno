const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const dia = require('./data');
const { getRotinas, adicionarRotina, removerRotina } = require('./rotinasGlobal');

ipcMain.handle('count-weeks', (event, year) => dia.countWeeksInYear(year));
ipcMain.handle('count-days', (event,year) => dia.countDaysInYear(year));
ipcMain.handle('first-day', (event,year) => dia.firstDayYear(year));
ipcMain.handle('last-day', (event,year) => dia.lastDayYear(year));

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        fullscreen: true,
        kiosk: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile('src/index.html');

    mainWindow.removeMenu();
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

ipcMain.handle('get-rotinas', () => getRotinas());
ipcMain.handle('add-rotina', (event, nome, descricao, frequencia) => adicionarRotina(nome, descricao, frequencia));
ipcMain.handle('delete-rotina', (event, nome) => removerRotina(nome));

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
