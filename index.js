const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const {setMainMenu} = require('./mainMenu');
const windows = [];


let mainWindow;

function createBrowserWindow(browserWindowOpts) {
  let win = new BrowserWindow(Object.assign({
    width: 400,
    height: 400,
    backgroundColor: '#2e2c29',
    parent: mainWindow,
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
    backgroundColor: '#f4f4f4'
  });
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'))

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.backgroundColor = '#2e2c29';
  })
  setMainMenu(mainWindow);
  ipcMain.on('create-window', (event, props) => createBrowserWindow(props) );
  ipcMain.on('get-window-count', sendWindowCount)
  // require('devtron').install();
})