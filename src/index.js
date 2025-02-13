const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { data, day, week, month } = require('./data');
const  { getRotinas, adicionarRotina, removerRotina, getRotinaHoje, getRotinaDatas, adicionarRotinaData, removerRotinaData} = require('./rotinasGlobal');

ipcMain.handle('day', (event) => data.day());
ipcMain.handle('count-weeks', (event, year) => day.countWeeksInYear(year));
ipcMain.handle('count-days', (event, year) => day.countDaysInYear(year));
ipcMain.handle('first-day', (event, year) => day.firstDayYear(year));
ipcMain.handle('last-day', (event, year) => day.lastDayYear(year));
ipcMain.handle('today', (event) => day.today());
ipcMain.handle('weeks-in-month', (event, year, month) => week.countWeeksInMonth(year, month));
ipcMain.handle('weeks-in-all-month', (event, year) => week.countWeeksInAllMonths(year));
ipcMain.handle('current-week', (event) => week.currentWeek());
ipcMain.handle('months-in-year', (event) => month.countMonthsInYear());
ipcMain.handle('current-month', (event) => month.currentMonth());

ipcMain.handle('get-rotinas', () => getRotinas());
ipcMain.handle('add-rotina', (event, nome, descricao, frequencia) => adicionarRotina(nome, descricao, frequencia));
ipcMain.handle('delete-rotina', (event, nome) => removerRotina(nome));
ipcMain.handle('get-rotina-hoje', (event, data) => getRotinaHoje(data));
ipcMain.handle('get-rotina-datas', (event, nome) => getRotinaDatas(nome));
ipcMain.handle('add-rotina-data', (event, nome, data) => adicionarRotinaData(nome, data));
ipcMain.handle('delete-rotina-data', (event, nome, data) => removerRotinaData(nome, data));


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
