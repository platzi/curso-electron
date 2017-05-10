import { setIpc, openDirectory, saveFile, openPreferences } from './main-window/ipcRendererEvents'
import { addImagesEvents, searchImagesEvent, selectEvent } from './main-window/images-ui'

window.addEventListener('load', () => {
  setIpc()
  addImagesEvents()
  searchImagesEvent()
  selectEvent()
  buttonEvent('open-directory', openDirectory)
  buttonEvent('open-preferences', openPreferences)
  buttonEvent('save-button', saveFile)
})

function buttonEvent (id, func) {
  const openDirectory = document.getElementById(id)
  openDirectory.addEventListener('click', func)
}
