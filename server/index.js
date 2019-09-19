const express = require('express');
const compression = require('compression')
const bodyParser = require('body-parser')
const db = require('../db/index.js');
const pg = require ('../db/Postgress/index.js')

const app = express();
const port = 3001;

//parsing body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use(compression());
app.use(express.static('public'));
app.use('/:listing', express.static('public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


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
  //for PostGres
  pg.getImagesFromListings(req.params.listing, result => {
    res.send(result)
  })

})

//for posting a listing
app.post('/api/listing/:listing/photos', (req, res) =>{
  console.log(req.body.information, "this is the information")
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



app.listen(port, () => console.log(`Reservations listening on port ${port}!`));