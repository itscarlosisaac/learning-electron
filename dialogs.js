const { dialog, app, nativeImage } = require('electron')
const fs = require('fs')
const path = require('path')

module.exports = { showMessage, showSaveDialog, showOpenDialog };

function showMessage(browserWindow){
  dialog.showMessageBox(browserWindow, {
    type: 'info',
    icon: nativeImage.createFromPath('./me.jpg'),
    message: 'Hello',
    detail: 'This is the body of the dialog box',
    buttons: ['Ok', 'Close'],
    defaultId: 0
  }, (clickIndex) => {
    console.log(clickIndex)
  })
}

function showSaveDialog(browserWindow){
  dialog.showSaveDialog(browserWindow, {
    defaultPath: path.join(app.getPath('downloads'), 'memory-info.json')
  }, (filename) => {
    if ( filename ) {
      const memInfo = JSON.stringify(process.getProcessMemoryInfo(), null, 2);
      fs.writeFile( filename, memInfo, 'utf-8', (err) => {
        if ( err ) {
          dialog.showErrorBox('Save Failed', err );
        }
      })
    }
  })
}

function showOpenDialog(browserWindow){
  dialog.showOpenDialog(browserWindow, {
    defaultPath: app.getPath('downloads'),
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
    ]
  }, (filepaths) => {
    if( filepaths ) {
      console.log(filepaths, fs.readFileSync(filepaths[0], 'utf8'))
    }
  })
}