const spawn = require('child_process').spawn;
const timecut = require('timecut');

const buildVideo = async (config) => {
  const defaultConfig = {
    url: 'http://localhost:5000',
    viewport: {
      width: 1280,
      height: 720
    },
    selector: 'body',
    fps: 30,
    duration: 2.23,
    output: 'video.mp4',
    quiet: true,
    inputAudio: 'piloto.mp3',
    finalOutput: 'final.mp4',
    convert: true,
  }
  
  console.log('Starting recording...')
  const recordConfig = {...defaultConfig, ...config}
  const loop = await timecut(recordConfig)
  console.log('Recording finished')

  if(!recordConfig.convert) {
    console.log('Done');
    return recordConfig.output;
  }

  const finalVideo = await loopVideoToMp3(recordConfig)
  console.log('Done');
  return recordConfig.finalOutput
}

const loopVideoToMp3 = async (config) => {
    const ffmpegArgs = [
      '-stream_loop',
      '-1',
      '-i',
      `${__dirname}/${config.output}`,
      '-i',
      `${__dirname}/${config.inputAudio}`,
      '-shortest',
      '-map',
      '0:v:0',
      '-map',
      '1:a:0',
      '-y',
      `${__dirname}/${config.finalOutput}`,
    ];

    console.log('Starting video loop for audio duration...')
    const convertProcess = spawn('ffmpeg', ffmpegArgs);
    convertProcess.stderr.setEncoding('utf8');
    convertProcess.stderr.on('data', (data) => {
      if(!config.quiet) {
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
  }

  module.exports = buildVideo