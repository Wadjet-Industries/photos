createdb Photos_Gallery

DROP SCHEMA Photos CASCADE;

CREATE Photos;

CREATE TABLE Photos.listings(
  id INT SERIAL PRIMARY KEY,
);

CREATE TABLE Photos.images(
  id INT SERIAL PRIMARY KEY,
  url varchar(1500) NOT NULL,
  description varchar(255),
  user_submit boolean,
  date date,
);

CREATE TABLE Photos.listings_images(
  id INT SERIAL PRIMARY KEY,
  listing_id INT NOT NULL,
  image_id INT NOT NULL,
);
