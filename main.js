const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const path = require('path')
const AppWindow = require('./src/AppWindow')
const isDev = require('electron-is-dev')
const Store = require('electron-store')
const menuTemplate = require('./src/menuTemplate')
const QiniuManager = require('./src/utils/QiniuManager')
const settingsStore = new Store({ name: 'Settings'})
const fileStore = new Store({name: 'Files Data'})
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


  ipcMain.on('config-is-saved', () => {
    // watch out menu items index for mac and windows
    let qiniuMenu = process.platform === 'darwin' ? menu.items[3] : menu.items[2]
    console.log('qiniuMenu.submenu.items',qiniuMenu.submenu.items);
    
    const switchItems = (toggle) => {
      [1, 2, 3].forEach(number => {
        qiniuMenu.submenu.items[number].enabled = toggle
      })
    }
    const qiniuIsConfiged =  ['accessKey', 'secretKey', 'bucketName'].every(key => !!settingsStore.get(key))
    if (qiniuIsConfiged) {
      switchItems(true)
    } else {
      switchItems(false)
    }
  })

  // 监听渲染进程发送的事件
  // ipcMain.on('message', (event, arg) => {
  //   console.log(event)
  //   console.log(arg)
  //   event.reply('reply', 'hello from main process')
  // })
})
