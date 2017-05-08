'use strict'

// instanciando los objetos app y BrowserWindow
const { app, BrowserWindow } = require('electron')

// imprimiendo un mensaje en la consola antes de salir
app.on('before-quit', () => {
  console.log('Saliendo..')
})

// Ejecutando ordenes cuando la aplicación esta lista
app.on('ready', () => {
  // creando una ventana
  let win = new BrowserWindow()

  // detectando el cierre de la ventana para cerrar el aplicativo
  win.on('closed', () => {
    win = null
    app.quit()
  })
})
