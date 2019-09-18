var pg = require('pg')
var connectionString = "postgresql://postgres:password@localhost:5433/photos";
var pgClient = new pg.Client(connectionString);

pgClient.connect();

const getListings = (listingID, callback) => {
  listingID = Number(listingID)
  pgClient.query(`SELECT * from listings where id = ${listingID}`, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      callback(res.rows)
    }
  })
}

const getImagesFromListings = (listingID, callback) => {
  listingID = Number(listingID)
  pgClient.query(`SELECT * from listings_images where listing_id = ${listingID}`, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      callback(res.rows)
    }
  })
}






module.exports = {
  getListings,
  getImagesFromListings
}