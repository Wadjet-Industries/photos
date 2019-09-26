const pg = require('pg');
const connectionString = "postgresql://power_user:password@18.222.195.134:5432/photos";
const pool = new pg.Pool({connectionString: connectionString})

pool.connect();

const getListings = (listingID, callback) => {
  listingID = Number(listingID);
  pool.query(`SELECT * from listings where id = ${listingID}`, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      callback(res.rows)
    }
  });
};

const getImagesFromListings = (listingID, callback) => {
  listingID = Number(listingID);
  pool.query(`SELECT * from images where listing_id = ${listingID}`, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      callback(res.rows)
    }
  });
};

const updateImagesFromListings = (imageID, information, callback) => {
  imageID = Number(imageID);
  const url = information.url;
  const description = information.description;
  const user_submit = information.user_submit;
  const date = information.date;

  pool.query(`UPDATE images SET url = '${url}', description = '${description}', user_submit = ${user_submit}, date = '${date}' WHERE id = ${imageID}`, (err, res) => {
    if (err) {
      console.log(err)
      callback(`could not update for ${imageID}`)
    } else {
      callback(`could update for ${imageID}`)
    }
  })
}

const postImagesFromListings = (listingID, information, callback) => {
  listingID = Number(listingID);
  const url = information.url;
  const description = information.description;
  const user_submit = information.user_submit;
  const date = information.date;
  //for images
  pool.query(`INSERT INTO images (listing_id, url, description, user_submit, date) VALUES (${listingID}, '${url}', '${description}', '${user_submit}', '${date}')`, (err, res) => {
    if (err) {
      callback(`could not post on images for ${listingID}`)
    } else {
      console.log(res, "this is res")
      callback(`posted on images for for ${listingID}!`)
    }
  })
}

const deleteImagesFromListings = (imageID, callback) => {
  imageID = Number(imageID)
  pool.query(`DELETE FROM images WHERE ID = ${imageID}`, (err, res) => {
    if (err) {
      callback (`could not delete for ${imageID}`)
    } else {
      callback(`deleted image ${imageID}`)
    }
  })
}

module.exports = {
  getListings,
  getImagesFromListings,
  updateImagesFromListings,
  deleteImagesFromListings,
  postImagesFromListings
};
