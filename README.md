# ClosedTable: Banner Gallery Module

> Refactored legacy code for the back-end of a mock Open Table banner gallery module.

## Related Projects

  - https://github.com/llaminati/Banner-Gallery
  - https://github.com/llaminati/Menu
  - https://github.com/llaminati/Reservations
  - https://github.com/llaminati/Reviews

## Table of Contents

1. [Description](#Description)
1. [Requirements](#requirements)
1. [Development](#development)
1. [Screenshots](#screenshots)

## Description
The microservice that I initially inherited had a page load time of > 3s for one real client visiting the page, without stress testing for multiple users per second. By refactoring the back-end to use PostgreSQL instead of MongoDB, I was able to decrease page rendering times to < 25 ms. Using Loader.io as a stress tester and newRelic as my metrics watcher, I stress tested my proxy server and found that it could only handle 150-160 Requests per second with a latency of 500 ms and an error rate of 14%. After additional configuration, refactoring, and implementation of load balancing and Redis caching, I was able to increase my throughput to 1900 RPS. For any further questions, please ask me about this project.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### Seeding database

```sh
npm run create---makes the database and table for PostgreSQL
npm run seed--- seeds 10 million records and 50 million photos to PostgreSQL
```

### Starting webpack and run server

```sh
npm run build ---for watching your changes.
npm run start ---for starting up your server.
```

### RESTful CRUD API
```sh
-------------------------------------------------
For getting: app.get ~ "/api/listing/:listing/photos"
input: {:listing_id}
output:
  success:
    ex) [
        {
            "id": 917,
            "url": "https://llaminati-images.s3-us-west-1.amazonaws.com/26.jpg",
            "description": "Repellat Officiis Molestiae",
            "user_submit": 0,
            "date": "2019-02-11T08:00:00.000Z",
            "unrelated_flag": 0,
            "image_id": 26
        },
        {
            "id": 404,
            "url": "https://llaminati-images.s3-us-west-1.amazonaws.com/63.jpg",
            "description": "Et Quo Non",
            "user_submit": 0,
            "date": "2018-11-20T08:00:00.000Z",
            "listing_id": 2,
            "image_id": 63
        }
    ]
  failure:
    response(400)
    "could not get"
-------------------------------------------------
For posting: app.post ~ "/api/listing/:listing/photos"
input: {url: url, description: "", user_submit:0, date: date,}
output:
  success:
    ex){listing_id}
    "succesful post"
  failure:
    response(400)
    "could not post"

-------------------------------------------------
For updating: app.put ~ "/api/:listing/photos/:photo"
input: anything that needs updating ~ {listing_id, image_id, `things that need updating`}
output:
  success:
    response(201)
  failure:
    response(400)
    "could not update"
-------------------------------------------------
For deleting: app.delete ~ "/api/:listing/photos/:photo"
input: {image_id}
output:
  success:
    response(200)
  failure:
    response(400)
    "could not delete"
```

## Screenshots
 ### PostGreSQL without implementation of indexing

![withoutIndex](https://i.imgur.com/dwKK07f.png)


 ### PostGreSQL with implementation of indexing
![withIndex](https://imgur.com/iUTlKKx)

 ### initial stress-test data
![initialStressTest](https://imgur.com/4bjRja1)

 ### stress-test data after optimizations