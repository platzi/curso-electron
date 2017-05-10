import fs from 'fs-extra'

function applyFilter (filter, currentImage) {
  let imgObj = new Image() // eslint-disable-line
  imgObj.src = currentImage.src

  filterous.importImage(imgObj, {}) // eslint-disable-line
    .applyInstaFilter(filter)
    .renderHtml(currentImage)
}

function saveImage (fileName, callback) {
  let fileSrc = document.getElementById('image-displayed').src

  if (fileSrc.indexOf(';base64,') !== -1) {
    fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/, '')
    fs.writeFile(fileName, fileSrc, 'base64', callback)
  } else {
    fileSrc = fileSrc.replace('file://', '')
    console.log(fileSrc)
    fs.copy(fileSrc, fileName, callback)
  }
}

module.exports = {
  applyFilter: applyFilter,
  saveImage: saveImage
}
