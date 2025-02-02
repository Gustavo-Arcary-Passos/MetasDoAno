const { app, BrowserWindow } = require('electron')

let mainWindow

function createWindow () {
  // Cria a janela do navegador
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Carrega o arquivo HTML
  mainWindow.loadFile('src/index.html')

  // Abre as ferramentas de desenvolvedor (opcional)
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Quando o Electron estiver pronto, cria a janela
app.whenReady().then(createWindow)

// Encerramento quando todas as janelas forem fechadas
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
