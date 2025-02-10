const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { day, week, month } = require('./data');
const { getRotinas, adicionarRotina, removerRotina } = require('./rotinasGlobal');

ipcMain.handle('count-weeks', (event, year) => day.countWeeksInYear(year));
ipcMain.handle('count-days', (event, year) => day.countDaysInYear(year));
ipcMain.handle('first-day', (event, year) => day.firstDayYear(year));
ipcMain.handle('last-day', (event, year) => day.lastDayYear(year));
ipcMain.handle('weeks-in-month', (event, year, month) => week.countWeeksInMonth(year, month));
ipcMain.handle('weeks-in-all-month', (event, year) => week.countWeeksInAllMonths(year));
ipcMain.handle('months-in-year', (event) => month.countMonthsInYear());

ipcMain.handle('get-rotinas', () => getRotinas());
ipcMain.handle('add-rotina', (event, nome, descricao, frequencia) => adicionarRotina(nome, descricao, frequencia));
ipcMain.handle('delete-rotina', (event, nome) => removerRotina(nome));

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
