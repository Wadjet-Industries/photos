DROP KEYSPACE IF EXISTS photos_gallery;

CREATE KEYSPACE photos_gallery
with replication = {'class':'SimpleStrategy', 'replication_factor': 1};

use photos_gallery;

Create table listings (
listing_id int,
PRIMARY KEY (listing_id)
);

Create table images_listings (
  images_id int,
  listing_id int,
  url text,
  description text,
  user_submit boolean,
  date date,
  PRIMARY KEY (listing_id, images_id)
);