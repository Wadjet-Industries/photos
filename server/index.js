const express = require('express');
const compression = require('compression')
const db = require('../db/index.js');
const pg = require ('../db/Postgress/index.js')

const app = express();
const port = 3001;

app.use(compression());
app.use(express.static('public'));
app.use('/:listing', express.static('public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


//for getting a listing
app.get('/api/:listing', (req, res) => {
  // // for MYSQL
  // db.getImagesFromListing(req.params.listing, (error, images) => {
  //   if (error) { return error; }
  //   res.send(images);
  // });

  // //for PostGres
  pg.getListings(req.params.listing, (result) => {
      res.send(result)
  })
});

//for getting the images of a listing
app.get('/api/:listing/photos', (req, res) => {
  //for PostGres
  pg.getImagesFromListings(req.params.listing, result => {
    res.send(result)
  })

  //for Cassandra
})

//for posting a listing
app.post('/api/post/:listing', (req, res) =>{

});
//for updating a listing
app.put('/api/update/:listing', (req, res) => {


})
//for deleting a listing
app.delete('/api/delete/:listing', (req, res) => {

})



app.listen(port, () => console.log(`Reservations listening on port ${port}!`));