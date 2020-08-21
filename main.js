const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev')

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    width: 1424,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  })
  console.log('isDev', isDev);
  
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyUrl'
  mainWindow.loadURL(urlLocation)
  mainWindow.webContents.openDevTools()
  // 监听渲染进程发送的事件
  ipcMain.on('message', (event, arg) => {
    console.log(event)
    console.log(arg)
    event.reply('reply', 'hello from main process')
  })
  // let secondWindow = new BrowserWindow({
  //   width: 400,
  //   height: 300,
  //   webPreferences: {
  //     nodeIntegration: true
  //   },
  //   parent: mainWindow
  // })
  // secondWindow.loadFile('second.html')
})