import { setIpc, openDirectory, saveFile, openPreferences, uploadImage } from './main-window/ipcRendererEvents'
import { addImagesEvents, searchImagesEvent, selectEvent, print } from './main-window/images-ui'

window.addEventListener('load', () => {
  setIpc()
  addImagesEvents()
  searchImagesEvent()
  selectEvent()
  buttonEvent('open-directory', openDirectory)
  buttonEvent('open-preferences', openPreferences)
  buttonEvent('save-button', saveFile)
  buttonEvent('print-button', print)
  buttonEvent('upload-button', uploadImage)
})

function buttonEvent (id, func) {
  const openDirectory = document.getElementById(id)
  openDirectory.addEventListener('click', func)
}
