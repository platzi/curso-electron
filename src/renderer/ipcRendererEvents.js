import { ipcRenderer } from 'electron'
import { addImagesEvents, clearImages, loadImages, selectFisrtImage } from './images-ui'

function setIpc () {
  ipcRenderer.on('load-images', (event, images) => {
    clearImages()
    loadImages(images)
    addImagesEvents()
    selectFisrtImage()
  })
}

function openDirectory () {
  ipcRenderer.send('open-directory')
}

module.exports = {
  setIpc: setIpc,
  openDirectory: openDirectory
}
