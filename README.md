# Banner Gallery

> Project description

## Related Projects

  - https://github.com/llaminati/Banner-Gallery
  - https://github.com/llaminati/Menu
  - https://github.com/llaminati/Reservations
  - https://github.com/llaminati/Reviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

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
npm run create
npm run seed
```

### Starting webpack and run server

```sh
npm run build
npm run start
```

### RESTful CRUD API
```sh
-------------------------------------------------
For getting: app.get ~ "/api/:listing"
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
For posting: app.post ~ "/api/:listing"
input: {url: url, description: "", user_submit:0, date: date,}
output:
  success:
    ex){listing_id}
    "succesful post"
  failure:
    response(400)
    "could not post"

-------------------------------------------------
For updating: app.put ~ "/api/:listing"
input: anything that needs updating ~ {listing_id, image_id, `things that need updating`}
output:
  success:
    response(201)
  failure:
    response(400)
    "could not update"
-------------------------------------------------
For deleting: app.delete ~ "/api/:listing"
input: {listing_id, image_id}
output:
  success:
    response(200)
  failure:
    response(400)
    "could not delete"
```