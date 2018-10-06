const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const assert = require('assert');
const mongoose = require('mongoose');
const app = express();
var exphbs = require('express-handlebars');
const queryString = require('querystring');
const parsed = queryString.parse('location.search');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;

var carSchema = new Schema({
  plate: String,
  car: String,
  location: String
});
var Car = mongoose.model('car', carSchema);

const port = 8000;
app.listen(port, () => {
  console.log('we are live on ' + port);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('mongodb connected');
});

// Get home page
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('main'));

app.get('/', function(req, res) {
  Car.findOne().exec(function(wee, data) {
    // console.log(data);
    res.render('index', {
      items: data
    });
  });
});

app.post('/get-data', function(req, res, next) {
  var resultArray = [];
});

app.post('/insert', function(req, res, next) {
  console.log('run');
  var item = {
    plate: req.body.plate,
    car: req.body.car,
    location: req.body.location
  };

  const car = new Car(item);
  car.save(function(err, doc) {
    if (err) {
      //res.send(error);
      console.log('err');
      return;
    }
    //res.send(doc);
  });

  res.redirect('/');
});
console.log('location.search');
console.log(parsed);
console.log('location.hash');
// Car.findOne({ plate: 'aa' }, function(err, doc) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(doc);
// });
