const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const path = require('path')
const AppWindow = require('./src/AppWindow')
const isDev = require('electron-is-dev')
const menuTemplate = require('./src/menuTemplate')

app.on('ready', () => {

  const mainWindowConfig = {
    width: 1440,
    height: 768,   
  }
  
  const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './index.html')}`
  mainWindow = new AppWindow(mainWindowConfig, urlLocation)
  mainWindow.webContents.openDevTools()

  let menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 创建设置窗口
  ipcMain.on('open-settings-window', () => {

    const settingsWindowConfig = {
      width: 500,
      height: 400,
      parent: mainWindow  
    }

    const settingsFileLocation = `file://${path.join(__dirname, './settings/settings.html')}`
    // 创建设置窗口 
    settingsWindow = new AppWindow(settingsWindowConfig, settingsFileLocation)
    settingsWindow.removeMenu()
    settingsWindow.on('closed', () => {
      settingsWindow = null
    })
  })

  // 监听渲染进程发送的事件
  ipcMain.on('message', (event, arg) => {
    console.log(event)
    console.log(arg)
    event.reply('reply', 'hello from main process')
  })
})
