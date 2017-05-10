import { ipcRenderer } from 'electron'

function setIpc () {
  ipcRenderer.on('pong', (event, arg) => {
    console.log(`pong recibido - ${arg}`)
  })
}

function openDirectory () {
  ipcRenderer.send('open-directory')
}

module.exports = {
  setIpc: setIpc,
  openDirectory: openDirectory
}
