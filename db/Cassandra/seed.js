var fs = require('fs')
const faker = require('faker');

function getRandomInt(max1) {
    return (Math.floor(Math.random() * Math.floor(max1)) + 1);
  }

  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

// for listings

//function for writing 100 million images and draining
var writeListings = fs.createWriteStream('listings.csv')
writeListings.write('id, url, description, user_submit, date\n', 'utf8');
function writeTenMillionListings(writer, encoding, callback) {
  let i = 999999
  let id = 0;
  function write() {
    let ok = true;
    //while do loop for when i is still greater than 0. will end when i !> 0
    do {
      i -= 1;
      id += 1;
      //logger every million
      if (id % 100000 === 0) {
        console.log(id)
      }
      let data = `${id}\n`
      if (i === 0) {
        writer.write(data, encoding, callback)
      } else {
        //sets ok to false if it can't write
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      //if ok is false, then drain
      writer.once('drain', write)
    }
  }
  //continue writing
  write()
}
//calls function
writeTenMillionListings(writeListings, 'utf-8', () => {
  writeListings.end();
  console.log("done!")
});


// for images

//function for writing 100 million images and draining
var writeImages = fs.createWriteStream('images.csv')
writeImages.write('images_id, listing_id, url, description, user_submit, date\n', 'utf8');
function writeFiftyMillionImages(writer, encoding, callback) {
  let i = 5000000
  // 50000000
  let id = 0;
  function write() {
    let ok = true;
    //while do loop for when i is still greater than 0. will end when i !> 0
    do {
      i -= 1;
      id += 1;
      //logger every million
      if (id % 1000000 === 0) {
        console.log(id)
      }
      let listing_id = getRandomInt(999998)
      let imageUrl = `https://llaminati-images.s3-us-west-1.amazonaws.com/${getRandomInt(99)}.jpg`;
      let description = faker.lorem.words();
      description = description.split(' ');
      description = description.map(word => word[0].toUpperCase() + word.substr(1));
      description = description.join(' ');
      let tempDate = faker.date.past()
      let date = `${tempDate.getFullYear()}-${pad(tempDate.getMonth() + 1, 2)}-${pad(tempDate.getDay() + 1, 2)}`
      let user_submit = faker.random.boolean()
      let data = `${id},${listing_id},${imageUrl},${description},${user_submit},${date}\n`
      if (i === 0) {
        writer.write(data, encoding, callback)
      } else {
        //sets ok to false if it can't write
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      //if ok is false, then drain
      writer.once('drain', write)
    }
  }
  //continue writing
  write()
}
//calls function
writeFiftyMillionImages(writeImages, 'utf-8', () => {
  writeImages.end();
  console.log("done!")
});