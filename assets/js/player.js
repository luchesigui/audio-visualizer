const Player = function(episode) {
  this.episode = episode;
  document.getElementById('track').innerHTML = episode.title;
  document.getElementById('epNumber').innerHTML = episode.epNumber;
};

Player.prototype = {
    play: function(sound = null) {
        const self = this;
        const {episode} = self;
        const bar = document.getElementById('bar');
        
        if (episode.howl) {
            sound = episode.howl;
        } else {
          const howlBasicConfig = {
            src: [`${episode.file}`],
            html5: true,
            onplay: function() {
                wave.container.style.opacity = 1;
                bar.style.opacity = 0;
            },
            onload: function() {
                wave.container.style.opacity = 1;
                bar.style.opacity = 0;
            },
            onend: function() {
                wave.container.style.opacity = 0;
                bar.style.opacity = 1;
            },
            onpause: function() {
                wave.container.style.opacity = 0;
                bar.style.opacity = 1;
            },
            onstop: function() {
                wave.container.style.opacity = 0;
                bar.style.opacity = 1;
            },
          }

          if(episode.cutStart && episode.cutLength) {
            sound = episode.howl = new Howl({
              ...howlBasicConfig,
              sprite: {
                drop: [episode.cutStart, episode.cutLength].map(time => time * 1000)
              },
            });
          } else {
            sound = episode.howl = new Howl(howlBasicConfig);
          }
        }

        if(episode.cutStart && episode.cutLength) {
          sound.play('drop');
        } else {
          sound.play();
        }
    },
    pause: function() {
        const self = this;
        const sound = self.episode.howl;
        sound.pause();
    },
};

const isPlaying = () => document.body.getAttribute('playing') !== 'true';
const togglePlay = () => {
  if(isPlaying()) {
    document.body.setAttribute('playing', 'true');
    player.play();
  } else {
    document.body.setAttribute('playing', 'false');
    player.pause();
  }
}

document.addEventListener('click', togglePlay);
document.addEventListener('keyup', (e) => {
  if(e.keyCode == 32){
    togglePlay();
    return;
  }

  if(e.keyCode == 82){
    record();
  }
});

async function record() {
  let stream = await navigator.mediaDevices.getDisplayMedia();
  let recorder = new RecordRTCPromisesHandler(stream, {
    type: 'video'
  });
  recorder.startRecording();
  togglePlay();
  
  const sleep = m => new Promise(r => setTimeout(r, m));
  await sleep(5000);
  
  await recorder.stopRecording();
  let blob = await recorder.getBlob();
  invokeSaveAsDialog(blob, 'loop-file.webm');
}

const waveform = document.getElementById('waveform');
const wave = new SiriWave({
    container: waveform,
    width: window.innerWidth,
    height: window.innerHeight * 0.3,
    cover: true,
    speed: 0.03,
    amplitude: 0.7,
    frequency: 2
});
wave.start();

const resize = function() {
    const height = window.innerHeight * 0.3;
    const width = window.innerWidth;
    wave.height = height;
    wave.height_2 = height / 2;
    wave.MAX = wave.height_2 - 4;
    wave.width = width;
    wave.width_2 = width / 2;
    wave.width_4 = width / 4;
    wave.canvas.height = height;
    wave.canvas.width = width;
    wave.container.style.margin = -(height / 2) + 'px auto';
};
resize();
window.addEventListener('resize', resize);

const player = new Player({
  epNumber: 'S1 EP3',
  title: 'Cartões de Crédito',
  file: 'assets/episodios/morando-em-airbnb.mp3',
  cutStart: 770,
  cutLength: 41.7,
});
