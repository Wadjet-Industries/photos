require ('newrelic')
const express = require('express');
const compression = require('compression')
const bodyParser = require('body-parser')
const db = require('../db/index.js');
const pg = require ('../db/Postgress/index.js')
const cors = require ('cors')
const app = express();
const port = 3001;
app.use(cors())

var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;


//parsing body
app.use(compression());
app.use(bodyParser.json())
app.use(express.static('public'));
app.use('/:listing', express.static('public', {maxAge:31557600}));
//for loader
//for getting a listing
app.get('/api/listing/:listing', (req, res) => {
  // // for MYSQL
  // db.getImagesFromListing(req.params.listing, (error, images) => {
  //   if (error) { return error; }
  //   res.send(images);
  // });

  //for PostGres
  pg.getListings(req.params.listing, (result) => {
      res.send(result)
  })
});

//for getting the images of a listing
app.get('/api/listing/:listing/photos', (req, res) => {
  //for Postgres
  pg.getImagesFromListings(req.params.listing, result => {
    res.send(result)
  })

})

//for posting a listing
app.post('/api/listing/:listing/photos', (req, res) =>{
  pg.postImagesFromListings(req.params.listing, req.body.information, result => {
    res.send(result)
  })
});
//for updating a listing
app.put('/api/listing/:listing/photos/:photo', (req, res) => {
  var photo = req.params.photo
  pg.updateImagesFromListings(photo, req.body.information, result => {
    res.send(result)
  })

})
//for deleting a listing
app.delete('/api/listing/:listing/photos/:photo', (req, res) => {
  pg.deleteImagesFromListings(req.params.photo, result => {
    res.send(result)
  })
})



app.listen(port, () => console.log(`photosGallery listening on port ${port}!`));
