const changeImage = (basePath, src, target = false) => {
  if(!basePath || !src) {
    return;
  }

  const filePath = `${basePath}/${src}`
  if(target) {
    return document
      .querySelector(target)
      .style
      .backgroundImage = `url(${filePath})`;
  }

  document
    .getElementById('cover')
    .src = filePath
}

const changeText = (text, target) => {
  if(text) {
    document.querySelector(target).innerText = text
  }
}

const objectifiedParams = Object.fromEntries(
  (new URL(document.location)).searchParams
)
const { title, subtitle, assetsPath, cover, background, sound } = objectifiedParams

changeText(title, '#track')
changeText(subtitle, '#epNumber')
changeImage(assetsPath, cover);
changeImage(assetsPath, background, 'body');
