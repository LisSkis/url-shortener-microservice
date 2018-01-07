const Express = require('express');

const { mongoose } = require('./db/mongoose');
const { Url } = require('./models/url');

const app = Express();
const port = process.env.PORT || 3000;

app.get('/new/http://:url', (req, res) => {
  const original_url = `http://${req.params.url}`;
  const url = new Url({
    original_url,
  });

  url.save().then((doc) => {
    res.send({
      original_url,
      short_url: `${req.headers.host}/${doc.urlIndex}`,
    });
  }, e => res.status(400).send(e));
});

app.get('/new/https://:url', (req, res) => {
  const original_url = `https://${req.params.url}`;
  const url = new Url({
    original_url,
  });

  url.save().then((doc) => {
    res.send({
      original_url,
      short_url: `${req.headers.host}/${doc.urlIndex}`,
    });
  }, e => res.status(400).send(e));
});

app.get('/new/:url', (req, res) => {
  res.status(400).send('You passed wrong url');
});

app.get('/:urlIndex', (req, res) => {
  const urlIndex = req.params.urlIndex;
  
  Url.findOne({ urlIndex }).then((url) => {
    res.writeHead(302, {'Location': url.original_url});
    res.end();
  });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`)
});
