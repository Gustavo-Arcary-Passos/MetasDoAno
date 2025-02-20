const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { data, day, week, month, groupDatesBy } = require('./data');
const  { getRotinas, adicionarRotina, removerRotina, getRotinaHoje, getRotinaDatas, adicionarRotinaData, removerRotinaData, countAllRotinasAllDays} = require('./rotinasGlobal');

ipcMain.handle('day', (event) => data.day());
ipcMain.handle('count-weeks', (event, year) => day.countWeeksInYear(year));
ipcMain.handle('count-days', (event, year) => day.countDaysInYear(year));
ipcMain.handle('first-day', (event, year) => day.firstDayYear(year));
ipcMain.handle('last-day', (event, year) => day.lastDayYear(year));
ipcMain.handle('today', (event,data) => day.today(data));
ipcMain.handle('day-number', (event, year, dayNumber) => day.dayFromNumber(year, dayNumber));
ipcMain.handle('weeks-in-month', (event, year, month) => week.countWeeksInMonth(year, month));
ipcMain.handle('weeks-in-all-month', (event, year) => week.countWeeksInAllMonths(year));
ipcMain.handle('current-week', (event,data) => week.currentWeek(data));
ipcMain.handle('week-number', (event, year, weekNumber) => week.weekFromNumber(year, weekNumber));
ipcMain.handle('day-to-sunday', (event, dateString) => week.getSundayOfWeek(dateString));
ipcMain.handle('months-in-year', (event) => month.countMonthsInYear());
ipcMain.handle('current-month', (event, data) => month.currentMonth(data));
ipcMain.handle('month-number', (event, year, monthNumber) => month.monthFromNumber(year, monthNumber));
ipcMain.handle('day-to-start-of-month', (event, dateString) => month.getFirstDayOfMonth(dateString));
ipcMain.handle('group-by-selected', (event, data, type) => groupDatesBy(data, type));

ipcMain.handle('get-rotinas', () => getRotinas());
ipcMain.handle('add-rotina', (event, nome, descricao, frequencia, color) => adicionarRotina(nome, descricao, frequencia, color));
ipcMain.handle('delete-rotina', (event, nome) => removerRotina(nome));
ipcMain.handle('get-rotina-hoje', (event, data) => getRotinaHoje(data));
ipcMain.handle('get-rotina-datas', (event, nome) => getRotinaDatas(nome));
ipcMain.handle('add-rotina-data', (event, nome, data) => adicionarRotinaData(nome, data));
ipcMain.handle('delete-rotina-data', (event, nome, data) => removerRotinaData(nome, data));
ipcMain.handle('count-tasks-calendar', () => countAllRotinasAllDays());

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        fullscreen: true,
        kiosk: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
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
