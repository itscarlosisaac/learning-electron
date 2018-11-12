const { ipcRenderer } = require('electron');
const countEl = document.querySelector('#count');
const versionEl = document.querySelector('.version');
versionEl.innerText = process.versions.electron;

console.log(process)
console.log(process.versions)

document.querySelector('#new-window').addEventListener('click', () => {
  ipcRenderer.send('create-window', {
    x: 0,
    y: 0
  })
})

ipcRenderer.on('window-count', (event, props) => {
  countEl.textContent = props.count;
});

ipcRenderer.send('get-window-count');