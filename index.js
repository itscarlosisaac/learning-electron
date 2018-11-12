const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const {setMainMenu} = require('./mainMenu');
const windows = [];

let mainWindow;

function createBrowserWindow(browserWindowOpts) {
  let win = new BrowserWindow(Object.assign({
    width: 400,
    height: 400,
  }, browserWindowOpts ));

  windows.push(win);
  win.loadURL(path.join('file://', __dirname, 'index.html'));

  win.on('close', () => {
    windows.splice(windows.indexOf(win), 1);
    sendWindowCount();
  })
}

function sendWindowCount(){
  windows.forEach( win => {
    win.webContents.send('window-count', {count: windows.length });
  })
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
  });
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'))

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  })
  setMainMenu(mainWindow);
  ipcMain.on('create-window', (event, props) => createBrowserWindow(props) );
  ipcMain.on('get-window-count', sendWindowCount)
})