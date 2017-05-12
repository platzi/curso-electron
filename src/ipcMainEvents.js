import { ipcMain, dialog } from 'electron'
import isImage from 'is-image'
import filesize from 'filesize'
import fs from 'fs'
import path from 'path'

function setMainIpc (win) {
  ipcMain.on('open-directory', (event) => {
    dialog.showOpenDialog(win, {
      title: 'Seleccione la nueva ubicación',
      buttonLabel: 'Abrir ubicación',
      properties: ['openDirectory']
    },
    (dir) => {
      if (dir) {
        loadImages(event, dir[0])
      }
    })
  })

  ipcMain.on('load-directory', (event, dir) => {
    loadImages(event, dir)
  })

  ipcMain.on('open-save-dialog', (event, ext) => {
    dialog.showSaveDialog(win, {
      title: 'Guardar imagen modificada',
      buttonLabel: 'Guardar imagen',
      filters: [{name: 'Images', extensions: [ext.substr(1)]}]
    }, (file) => {
      if (file) {
        event.sender.send('save-image', file)
      }
    })
  })

  ipcMain.on('show-dialog', (event, info) => {
    dialog.showMessageBox(win, {
      type: info.type,
      title: info.title,
      message: info.message
    })
  })
}

function loadImages (event, dir) {
  const images = []

  fs.readdir(dir, (err, files) => {
    if (err) throw err

    for (var i = 0, length1 = files.length; i < length1; i++) {
      if (isImage(files[i])) {
        let imageFile = path.join(dir, files[i])
        let stats = fs.statSync(imageFile)
        let size = filesize(stats.size, {round: 0})
        images.push({filename: files[i], src: `plp://${imageFile}`, size: size})
      }
    }

    event.sender.send('load-images', dir, images)
  })
}

module.exports = setMainIpc
