const { Pool, Client } = require('pg')
const faker = require('faker');
const connectionString = 'postgresql://postgres:password@localhost:5433/photos'
//making new pool
const pool = new Pool({
  connectionString: connectionString,
  max: 1000,
})


//for error
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
//for seeding listings
var seedList = function() {
    pool.connect()
      .then(client => {
        for (let i = 1; i <= 20000; i++) {
         client
          .query(`INSERT INTO LISTINGS (ID) VALUES (DEFAULT)`)
          .then(res => {
            console.log(i)
          })
          .catch(e => {
            console.log(e)
            console.log("hitting error")
            client.release()
            return;
          })
        }
      })
      .catch(e => {
          console.log(e)
      })
}
//for repeating listings
var repeat = async function(callback, number) {
  for (let i = 1; i <= number; i++) {
    await callback()
  }
}
repeat(seedList, 10)
repeat(seedList, 10)
repeat(seedList, 10)
repeat(seedList, 10)