const { app, BrowserWindow } = require('electron')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    fullscreen: true, 
    kiosk: true, 
    frame: false, 
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('src/square.html')

  mainWindow.removeMenu();

  mainWindow.webContents.on("before-input-event", (event, input) => {
    if (input.control && (input.key === "I" || input.key === "J" || input.key === "U")) {
      event.preventDefault();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
