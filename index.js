const spawn = require('child_process').spawn;
const timecut = require('timecut');

const recordConfig = {
  url: 'http://localhost:5000',
  viewport: {
    width: 1280,
    height: 720
  },
  selector: 'body',
  fps: 30,
  duration: 2.2,
  output: 'video.mp4',
  quiet: true,
  inputAudio: 'piloto.mp3',
  finalOutput: 'final.mp4',
  convert: false,
}

console.log('Starting recording...')
timecut(recordConfig)
  .then(() => {
    console.log('Recording finished')
    if(!recordConfig.convert) {
      return;
    }

    const ffmpegArgs = [
      '-stream_loop',
      '-1',
      '-i',
      'video.mp4',
      '-i',
      `assets/episodios/${recordConfig.input}`,
      '-shortest',
      '-map',
      '0:v:0',
      '-map',
      '1:a:0',
      '-y',
      recordConfig.finalOutput,
    ];

    console.log('Starting video loop for audio duration...')
    const convertProcess = spawn('ffmpeg', ffmpegArgs);
    convertProcess.stderr.setEncoding('utf8');
    convertProcess.stderr.on('data', (data) => {
      if(!recordConfig.quiet) {
        console.log(data);
      }
    });

    return new Promise((resolve, reject) => {
      convertProcess.on('close', function () {
        resolve();
      });
      convertProcess.on('error', function (err) {
        processError = err;
        reject(err);
      });
      convertProcess.stdin.on('error', function (err) {
        processError = err;
        reject(err);
      });
    });
  })
  .then(() => {
    console.log('Done!');
  });