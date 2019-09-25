var csvWriter = require('csv-write-stream')
var fs = require('fs')
const faker = require('faker');
var writer = csvWriter()
//random int between 1 and a number + 1
function getRandomInt(max1) {
  return (Math.floor(Math.random() * Math.floor(max1)) + 1);
}


// // for listings
// var listings = fs.createWriteStream('listings.csv')
// listings.write('id\n', 'utf8')
// function writeListings (writer, encoding, callback) {
//   let i = 10000000;
//   let id = 0;
//   function write () {
//     let ok = true;
//     do {
//       i -= 1;
//       id +=1;
//       if (id % 1000000 === 0) {
//         console.log(id, "LISTING")
//       }
//       let data = `${id}\n`
//       if (i === 0) {
//         writer.write(data, encoding, callback)
//       } else {
//         ok = writer.write(data, encoding)
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       writer.once('drain', write)
//     }
//   }
//   write();
// }
// writeListings(listings, 'utf-8', () => {
//   listings.end();
//   console.log("done seeding listings!")
// });
// for images

//function for writing 100 million images and draining
var writeImages = fs.createWriteStream('images.csv')
writeImages.write('listing_id, url, description, user_submit, date\n', 'utf8');
function writeHundredImages(writer, encoding, callback) {
  let i = 50000000
  let id = 0;
  function write() {
    let ok = true;
    //while do loop for when i is still greater than 0. will end when i !> 0
    do {
      i -= 1;
      id += 1;
      //logger every million
      if (id % 1000000 === 0) {
        console.log(id, "IMAGES")
      }
      let imageUrl = `https://llaminati-images.s3-us-west-1.amazonaws.com/${getRandomInt(98)}.jpg`;
      let listingid = getRandomInt(9999999)
      let description = faker.lorem.words();
      description = description.split(' ');
      description = description.map(word => word[0].toUpperCase() + word.substr(1));
      description = description.join(' ');
      let tempDate = faker.date.past()
      let date = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDay() + 1}`
      let user_submit = faker.random.boolean()
      let data = `${listingid}, ${imageUrl}, ${description}, ${user_submit}, ${date}\n`
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
writeHundredImages(writeImages, 'utf-8', () => {
  writeImages.end();
  console.log("done seeding images!")
});

