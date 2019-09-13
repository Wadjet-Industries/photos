Create keyspace photos_gallery
with replication = {'class':'SimpleStrategy', 'replication_factor': '1'};

use photos_gallery;

Create table listings_images (
listing_id uuid,
post_id timeuuid,
images_id uuid,
PRIMARY KEY (listing_id, post_id)
WITH CLUSTERING ORDER BY  (post_id DESC)
);

Create table images_listings (
  images_id uuid,
  listing_id uuid,
  url text,
  description text,
  user_submit boolean,
  date date,
  PRIMARY KEY (images_id, listing_id)
  WITH CLUSTERING ORDER BY (listing_id DESC)
);