'use strict'

// instanciando los objetos app y BrowserWindow
import { app, BrowserWindow, ipcMain } from 'electron'
import devtools from './devtools'

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
  let win = new BrowserWindow({
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

ipcMain.on('ping', (event, arg) => {
  console.log(`se recibio ping - ${arg}`)
  event.sender.send('pong', new Date())
})
