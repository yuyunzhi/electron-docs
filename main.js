const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const isDev = require('electron-is-dev')
const menuTemplate = require('./src/menuTemplate')

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    width: 1424,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  })
  console.log('isDev', isDev)

  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyUrl'
  mainWindow.loadURL(urlLocation)
  mainWindow.webContents.openDevTools()

  let menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  // 监听渲染进程发送的事件
  ipcMain.on('message', (event, arg) => {
    console.log(event)
    console.log(arg)
    event.reply('reply', 'hello from main process')
  })
})
