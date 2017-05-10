import fs from 'fs'

function applyFilter (filter, currentImage) {
  let imgObj = new Image() // eslint-disable-line
  imgObj.src = currentImage.src

  filterous.importImage(imgObj, {}) // eslint-disable-line
    .applyInstaFilter(filter)
    .renderHtml(currentImage)
}

function saveImage (fileName) {
  let fileSrc = document.getElementById('image-displayed').src
  fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/, '')
  fs.writeFile(fileName, fileSrc, 'base64', (err) => {
    if (err) console.log(err)
  })
}

module.exports = {
  applyFilter: applyFilter,
  saveImage: saveImage
}
