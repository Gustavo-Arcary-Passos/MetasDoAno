const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  day: () => ipcRenderer.invoke('day'),
  countWeeksInYear: (year) => ipcRenderer.invoke('count-weeks', year),
  countDaysInYear: (year) => ipcRenderer.invoke('count-days', year),
  firstDayYear: (year) => ipcRenderer.invoke('first-day', year),
  lastDayYear: (year) => ipcRenderer.invoke('last-day', year),
  today: (data) => ipcRenderer.invoke('today',data),
  dayFromNumber: (year, dayNumber) => ipcRenderer.invoke('day-number',year, dayNumber),
  countWeeksInMonth: () => ipcRenderer.invoke('weeks-in-month', year, month),
  countWeeksInAllMonths: (year) => ipcRenderer.invoke('weeks-in-all-month', year),
  currentWeek: (data) => ipcRenderer.invoke('current-week',data),
  weekFromNumber: (year, weekNumber) => ipcRenderer.invoke('week-number', year, weekNumber),
  getSundayOfWeek: (dateString) => ipcRenderer.invoke('day-to-sunday', dateString),
  countMonthsInYear: () => ipcRenderer.invoke('months-in-year'),
  currentMonth: (data) => ipcRenderer.invoke('current-month',data),
  monthFromNumber: (year, monthNumber) => ipcRenderer.invoke('month-number', year, monthNumber),
  getFirstDayOfMonth: (dateString) => ipcRenderer.invoke('day-to-start-of-month', dateString),
  groupDatesBy: (data, type) => ipcRenderer.invoke('group-by-selected',data, type),
  getRotinas: () => ipcRenderer.invoke('get-rotinas'),
  addRotina: (nome, descricao, frequencia, color) => ipcRenderer.invoke('add-rotina', nome, descricao, frequencia, color),
  deleteRotina: (nome) => ipcRenderer.invoke('delete-rotina', nome),
  getRotinaHoje: (data) => ipcRenderer.invoke('get-rotina-hoje', data),
  getRotinaDatas: (nome) => ipcRenderer.invoke('get-rotina-datas', nome),
  adicionarRotinaData: (nome, data) => ipcRenderer.invoke('add-rotina-data', nome, data),
  removerRotinaData: (nome, data) => ipcRenderer.invoke('delete-rotina-data', nome, data),
  countAllRotinasAllDays: () => ipcRenderer.invoke('count-tasks-calendar'),
});
