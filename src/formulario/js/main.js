const submitHandler = (e) => {
  e.preventDefault();
  // document.querySelector('button').setAttribute('disabled', true);

  const data = new FormData(e.target);
  fetch('/api', {
    method: 'post',
    body: data,
  })
  .then(res => res.json())
  .then((res) => {
    const link = document.createElement('a')

    link.href = res.videoPath;
    link.setAttribute('download', '')
    link.click();

    // document.querySelector('button').removeAttribute('disabled');
  })
}

const handleFileUpload = (e) => {
  const { files } = e.target
  
  if(e.target.name == 'cover') {
    const newCover = window.URL.createObjectURL(files[0]);
    const coverHolder = document.querySelector('#exemple-cover')
    coverHolder.src = newCover
  }

  if(e.target.name == 'background') {
    const newBackground = window.URL.createObjectURL(files[0]);
    const coverHolder = document.querySelector('.exemplo')
    coverHolder.style.backgroundImage = `url(${newBackground})`
  }
}

document.addEventListener('submit', submitHandler)
document.addEventListener('change', handleFileUpload)
document.addEventListener('keyup', (e) => {
  if(!e.target.value) {
    return
  }

  if(e.target.name == 'subtitle') {
    document.querySelector('#epNumber').innerText = e.target.value
    return
  }
  
  if(e.target.name == 'title') {
    document.querySelector('#track').innerText = e.target.value
    return
  }
})
