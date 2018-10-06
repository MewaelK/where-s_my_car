////////////////////////////////////////////////////
// - Made with love by @iHDeveloper              ///
// - for Appz World hackathon                    ///
//                                               ///
// - Important to do before use!                 ///
// - Run Commmand: npm i express body-parser     ///
// - Rename file: server.js                      ///
//                                               ///
// - To start using the web host                 ///
// - node server                                 ///
////////////////////////////////////////////////////

const express = require('express');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SHA256 = require('crypto-js/sha256');
const app = express();
const map = new Map();

app.engine('handlebars', exhbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// To parse the body using JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('main'));

app.get('/', (req, res) => {
  res.render('index', {
    items: Array(map.values())
  });
});

// Create new by posting in /new
app.post('/insert', (req, res) => {
  const profile = req.body;
  const sha256 = SHA256('' + profile);
  profile.hash = sha256;
  map.set(profile.id, profile);
  res.redirect('/');
});

// Get the profile using /get
app.post('/get-data', (req, res) => {
  const id = req.body.id;
  res.render('index', {
    items: [map.get(id)]
  });
});

app.post('/get/:id', (req, res) => {
  res.render('client', {
    item: map.get(req.params.id)
  });
});

// Listen to the port
app.listen(8000, () => {
  console.log('Listening on port 8000...');
});
