SiriWave.prototype.resize = function() {
  const height = window.innerHeight * 0.3;
  const width = window.innerWidth;
  this.height = height;
  this.height_2 = height / 2;
  this.MAX = this.height_2 - 4;
  this.width = width;
  this.width_2 = width / 2;
  this.width_4 = width / 4;
  this.canvas.height = height;
  this.canvas.width = width;
  this.container.style.margin = -(height / 2) + 'px auto';
}

const wave = new SiriWave({
  container: document.getElementById('waveform'),
  width: window.innerWidth,
  height: window.innerHeight * 0.3,
  cover: true,
    speed: 0.03,
    amplitude: 0.7,
    frequency: 2
});

wave.start();
wave.resize();
window.addEventListener('resize', () => wave.resize());
