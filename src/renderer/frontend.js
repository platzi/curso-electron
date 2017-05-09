import url from 'url'
import path from 'path'
import applyFilter from './filters'

window.addEventListener('load', () => {
  addImagesEvents()
  searImagesEvent()
  selectEvent()
})

function addImagesEvents () {
  const thumbs = document.querySelectorAll('li.list-group-item')

  for (let i = 0, length1 = thumbs.length; i < length1; i++) {
    thumbs[i].addEventListener('click', function () {
      changeImage(this)
    })
  }
}

function selectEvent () {
  const select = document.getElementById('filters')

  select.addEventListener('change', function () {
    applyFilter(this.value, document.getElementById('image-displayed'))
  })
}

function changeImage (node) {
  if (node) {
    document.querySelector('li.selected').classList.remove('selected')
    node.classList.add('selected')
    document.getElementById('image-displayed').src = node.querySelector('img').src
  } else {
    document.getElementById('image-displayed').src = ''
  }
}

function searImagesEvent () {
  const searchBox = document.getElementById('search-box')

  searchBox.addEventListener('keyup', function () {
    const regex = new RegExp(this.value.toLowerCase(), 'gi')

    if (this.value.length > 0) {
      const thumbs = document.querySelectorAll('li.list-group-item img')
      for (let i = 0, length1 = thumbs.length; i < length1; i++) {
        const fileUrl = url.parse(thumbs[i].src)
        const fileName = path.basename(fileUrl.pathname)
        if (fileName.match(regex)) {
          thumbs[i].parentNode.classList.remove('hidden')
        } else {
          thumbs[i].parentNode.classList.add('hidden')
        }
      }

      selectFisrtImage()
    } else {
      const hidden = document.querySelectorAll('li.hidden')
      for (let i = 0, length1 = hidden.length; i < length1; i++) {
        hidden[i].classList.remove('hidden')
      }
    }
  })
}

function selectFisrtImage () {
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
}
