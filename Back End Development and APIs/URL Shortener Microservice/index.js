require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const dns = require('dns')
// Connect to MongoDB for Moongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// For incrementing shortURL
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Body Parser for getting url from POST 
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

let urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: {
    type: Number
  }
})

urlSchema.plugin(AutoIncrement, {inc_field: 'short_url'});

const ShortURL = mongoose.model('ShortURL', urlSchema)

const findFromShort = (shorturl, done) => {
  ShortURL.find({ short_url: shorturl}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

app.post('/api/shorturl', (req, res) => {
  console.log(req.body.url)
  let pattern = /^(http:\/\/)|(https:\/\/).*/g;
  const postURL = req.body.url;
  if(pattern.test(postURL)) {
    console.log('Submitted URL is in proper format')
    if(!isValidUrl(postURL)) {
        return console.log('URL validation error')
      } else {
      console.log('URL is valid')
      let newURL = new ShortURL({
        original_url: postURL
      })
      newURL.save((err, data) => {
        if (err) return console.error(err)
        console.log('new document added successfully')
        res.json({ original_url: newURL.original_url, short_url: newURL.short_url })
      })
    }
  } else {
    console.log('Submitted URL is not in the proper format')
    res.json({ error: 'invalid url'})
  }
})

app.get('/api/shorturl/:short_url?', (req, res) => {
  if(!req.params.short_url) {
   res.json({ error: 'Forgot to add short_url number at the end of address'})
  } else {
    console.log('Passed empty parameter check')
    if (isNaN(req.params.short_url)) return console.log('NaN error')
    let getShortURL = parseInt(req.params.short_url)
    console.log(getShortURL)
    findFromShort(getShortURL, (error, getOriginalURL) => {
      if (error) { 
        return console.log('error finding from short') 
      } else {
        if(!getOriginalURL[0].original_url) {
          res.json({ error: 'No short URL found for the given input'})
          console.log('Not found from short_url')
        } else {
          console.log('Successfully found from short_url')
          console.log('Now Redirecting...')
          res.redirect(getOriginalURL[0].original_url)
          }
      }
      
    });
  }
  
})
