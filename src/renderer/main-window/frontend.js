import { setIpc, openDirectory, saveFile, openPreferences, uploadImage, pasteImage } from './main-window/ipcRendererEvents'
import { addImagesEvents, searchImagesEvent, selectEvent, print } from './main-window/images-ui'
import createMenu from './main-window/menu'

window.addEventListener('load', () => {
  createMenu()
  setIpc()
  addImagesEvents()
  searchImagesEvent()
  selectEvent()
  buttonEvent('open-directory', openDirectory)
  buttonEvent('open-preferences', openPreferences)
  buttonEvent('save-button', saveFile)
  buttonEvent('print-button', print)
  buttonEvent('upload-button', uploadImage)
  buttonEvent('paste-button', pasteImage)
})

function buttonEvent (id, func) {
  const openDirectory = document.getElementById(id)
  openDirectory.addEventListener('click', func)
}
