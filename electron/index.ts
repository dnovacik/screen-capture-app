import { app, BrowserWindow, ipcMain, nativeImage, Tray } from 'electron'
import * as path from 'path'
import isDev from 'electron-is-dev'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'

const url = isDev
  ? 'http://localhost:3000/index.html'
  : `file://${__dirname}/../index.html`

const image = nativeImage.createFromPath(path.join(__dirname, '..', 'logo192.png'))

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null

const createTray = () => {
  tray = new Tray(image)

  tray.setTitle('Screen Capture App')
  tray.setToolTip('Screen Capture App')

  tray.on('click', () => {
    toggleWindow()
  })
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 400,
    frame: false,
    icon: image,
    title: 'Screen Capture App',
    webPreferences: {
      enableRemoteModule: true,
      webSecurity: true,
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    alwaysOnTop: true
  })

  mainWindow.loadURL(url)

  // Hot Reloading
  if (isDev) {
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron.cmd'),
      forceHardReset: true,
      hardResetMethod: 'exit'
    })
  }

  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))

  if (isDev) {
    mainWindow.webContents.openDevTools({
      mode: 'detach',
    })
  }

  // window hooks
  mainWindow.on('closed', () => mainWindow = null)
}

const toggleWindow = () => {
  mainWindow.isVisible()
    ? mainWindow.hide()
    : mainWindow.show()
}

// app hooks
app.on('ready', async () => {
  createTray()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }

  if (tray === null) {
    createTray()
  }
})

//ipc hooks
ipcMain.on('test', () => {
  console.log('booyakasha wagwaan')
})

ipcMain.on('window:minimize', () => {
  mainWindow.minimize()
})

ipcMain.on('window:close', () => {
  app.quit()
})