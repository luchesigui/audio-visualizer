const cors = require('cors');
const rimraf = require('rimraf');
const express = require('express');
const fileUpload = require('express-fileupload');
const { json, urlencoded } = require('body-parser');

const buildVideo = require('./video-handler');

const app = express()
const port = 3000

app.use(fileUpload({createParentPath: true}));

app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));

app.post('/api', async (req, res) => {
  const { title, subtitle } = req.body;
  const { cover, background, episode } = req.files;

  if (!req.files || !title || !subtitle ) {
    return res.status(400).json({
      message: 'Todos os campos precisam ser preenchidos'
    });
  }

  try {
    const pathBase = `uploads/${(new Date()).getTime()}`
    const publicPathBase = `public/${pathBase}`
    cover.mv(`${publicPathBase}/${cover.name}`);
    background.mv(`${publicPathBase}/${background.name}`);

    const videoPath = await buildVideo({
      url: `${__dirname}/template.html?title=${title}&subtitle=${subtitle}&cover=${publicPathBase}/${cover.name}&background=${publicPathBase}/${background.name}`,
      output: `${publicPathBase}/loop.mp4`
    });

    res.json({
      message: 'Vídeo finalizado',
      videoPath: videoPath.replace('public', '')
    })

    const minutesInMiliseconds = min => min * 1000 * 60
    setTimeout(() => 
      rimraf(publicPathBase, (err) =>
        err ? console.error(err) : console.log(`Folder ${publicPathBase} deleted`)
      ),
      minutesInMiliseconds(10)
    )
  } catch (err) {
      res.status(500).send(err);
  }
})

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app