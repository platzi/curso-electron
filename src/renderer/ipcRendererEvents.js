import { ipcRenderer } from 'electron'
import { addImagesEvents, clearImages, loadImages, selectFisrtImage } from './images-ui'
import { saveImage } from './filters'
import path from 'path'

function setIpc () {
  ipcRenderer.on('load-images', (event, images) => {
    clearImages()
    loadImages(images)
    addImagesEvents()
    selectFisrtImage()
  })

  ipcRenderer.on('save-image', (event, file) => {
    saveImage(file, (err) => {
      if (err) return showDialog('error', 'Platzipics', err.message)

      showDialog('info', 'Platzipics', 'La imagen fue guardada')
    })
  })
}

function openDirectory () {
  ipcRenderer.send('open-directory')
}

function showDialog (type, title, msg) {
  ipcRenderer.send('show-dialog', {type: type, title: title, message: msg})
}

function saveFile () {
  const image = document.getElementById('image-displayed').dataset.original
  const ext = path.extname(image)

  ipcRenderer.send('open-save-dialog', ext)
}

module.exports = {
  setIpc: setIpc,
  saveFile: saveFile,
  openDirectory: openDirectory
}
