
import { enableLiveReload } from 'electron-compile'
import electronDebug from 'electron-debug'

module.exports = function devtools () {
  enableLiveReload()
  // Mostrando las herramientas de DevTools para las diferentes ventanas
  electronDebug({ showDevTools: true })
}
