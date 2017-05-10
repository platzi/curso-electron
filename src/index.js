'use strict'

// instanciando los objetos app y BrowserWindow
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import devtools from './devtools'

let win

if (process.env.NODE_ENV === 'development') {
  devtools()
}

// imprimiendo un mensaje en la consola antes de salir
app.on('before-quit', () => {
  console.log('Saliendo..')
})

// Ejecutando ordenes cuando la aplicación esta lista
app.on('ready', () => {
  // creando una ventana
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Hola Mundo!',
    center: true,
    maximizable: false,
    show: false
  })

  // Mostrando la ventana solo cuando el contenido a mostrar sea cargado
  win.once('ready-to-show', () => {
    win.show()
  })

  // Escuchando el evento cuando la ventana es movida
  win.on('move', () => {
    const position = win.getPosition()
    console.log(`la posición es ${position}`)
  })

  // detectando el cierre de la ventana para cerrar el aplicativo
  win.on('closed', () => {
    win = null
    app.quit()
  })

  // Carga una url desde el folder renderer
  win.loadURL(`file://${__dirname}/renderer/index.html`)
})

ipcMain.on('open-directory', (event) => {
  dialog.showOpenDialog(win, {
    title: 'Seleccione la nueva ubicación',
    buttonLabel: 'Abrir ubicación',
    properties: ['openDirectory']
  },
  (dir) => {
    console.log(dir)
  })
})
