import { getCoockieFavoritePhotos } from "/scripts/coockie.js";
import { setCoockieFavoritePhotos } from "/scripts/coockie.js";

const filledStar = `
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M8.0868 1.04641C8.43933 0.256421 9.56067 0.25642 9.9132 1.0464L11.9048 5.50932L16.767 6.02193C17.628 6.1127 17.9746 7.1804 17.3311 7.75964L13.7 11.0284L14.7145 15.8063C14.8943 16.6527 13.9869 17.3124 13.2371 16.8805L9 14.4393L4.76287 16.8805C4.01306 17.3124 3.10573 16.6527 3.28547 15.8063L4.3 11.0284L0.668853 7.75964C0.0253845 7.1804 0.372042 6.1127 1.23305 6.02193L6.09524 5.50932L8.0868 1.04641Z"
        />
</svg>`
const activeStarStyle = 'fill: #FFAF37;'

export default function createPhotosBlock(data) {
  let container = document.createElement('div')
  container.className = 'thumbnailPhotoArea'

  let favoriteids = getCoockieFavoritePhotos().map((photo) => { return photo.id })

  data.forEach(photoData => {
    let photoEl = createThumbnailPhoto(photoData, favoriteids.includes(photoData.id))

    container.append(photoEl)
    photoEl.title = photoData.title
  }
  )

  return container
}

export function createThumbnailPhoto(photo, isFavorite) {
  let photoEl = document.createElement('div')
  photoEl.style = 'background: url(' + photo.thumbnailUrl + ');'
  photoEl.className = 'thumbnailPhoto'
  photoEl.onclick = () => {

    let frontScreen = createFogginScreen()

    let photoFullRes = document.createElement('img')
    frontScreen.append(photoFullRes)
    photoFullRes.src = photo.url
  }
  let favoriteButton = document.createElement('div')
  photoEl.append(favoriteButton);
  favoriteButton.title = ''
  favoriteButton.innerHTML = filledStar
  favoriteButton.className = 'favoriteButton flexCenter'


  if (isFavorite) {
    favoriteButton.children[0].style = activeStarStyle
  }

  favoriteButton.onclick = (event) => {
    event.stopPropagation()


    let favoritePhotos = getCoockieFavoritePhotos()
    let favoritesIds = favoritePhotos.map((photo) => { return photo.id })

    let index = favoritesIds.indexOf(photo.id)
    if (index != -1) {
      favoritePhotos.splice(index, 1)

      favoriteButton.children[0].style = ''

    } else {
      favoritePhotos.push(photo)

      favoriteButton.children[0].style = activeStarStyle


    }
    setCoockieFavoritePhotos(favoritePhotos)

  }
  return photoEl
}
function createFogginScreen() {
  document.body.style = 'overflow:hidden; height: 100vh;'

  let fogginScreen = document.createElement('div')
  document.body.append(fogginScreen)
  fogginScreen.className = 'foggingScreen flexCenter'
  fogginScreen.style = 'top:' + self.pageYOffset + 'px'

  let escapeButton = document.createElement('button')
  fogginScreen.append(escapeButton)
  escapeButton.onclick = () => {
    fogginScreen.remove()
    document.body.style = ''
  }
  return fogginScreen
}