const changeImage = (src, target = false) => {
  if(!src) {
    return;
  }

  if(target) {
    return document
      .querySelector(target)
      .style
      .backgroundImage = `url(${src})`;
  }

  document
    .getElementById('cover')
    .src = src
}

const changeText = (text, target) => {
  if(text) {
    document.querySelector(target).innerText = text
  }
}

const params = (new URL(document.location)).searchParams;
changeText(params.get('title'), '#track')
changeText(params.get('subtitle'), '#epNumber')
changeImage(params.get('cover'));
changeImage(params.get('background'), 'body');
