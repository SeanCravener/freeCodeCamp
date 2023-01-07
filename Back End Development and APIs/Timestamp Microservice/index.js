
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  let dateIn = req.params.date;
  let dateOut;

  if (!req.params.date) {
    dateOut = new Date()
  } else {
    dateOut = new Date(dateIn)
    // Check if error NaN returned from new Date()
    if(isNaN(dateOut)) {
      dateOut = new Date(parseInt(dateIn));
    }
  }

  // Check if error NaN is still showing, bad Input
  if(isNaN(dateOut)) {
    res.json({ error: "Invalid Date" })
  } else {
    res.json({ unix: dateOut.getTime(), utc: dateOut.toUTCString() })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
