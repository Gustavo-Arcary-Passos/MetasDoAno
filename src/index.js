const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const dia = require('./data');

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
