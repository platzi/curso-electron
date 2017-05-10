import { remote } from 'electron'

window.addEventListener('load', () => {
  cancelButton()
})

function cancelButton () {
  const cancelButton = document.getElementById('cancel-button')

  cancelButton.addEventListener('click', () => {
    const prefsWindow = remote.getCurrentWindow()
    prefsWindow.close()
  })
}
