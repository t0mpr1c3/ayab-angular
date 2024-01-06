create database ayab;
use ayab;
create table users (
  id INT AUTO_INCREMENT,
  registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --username VARCHAR(150) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(150) NOT NULL,
  --authentication_data VARCHAR(255),
  PRIMARY KEY (id)
);
create table settings (
  user_id INT NOT NULL,
  machine INT DEFAULT 0,
  default_knitting_mode INT DEFAULT 0,
  default_infinite_repeat BOOLEAN NOT NULL DEFAULT 0,
  default_alignment INT DEFAULT 0,
  default_knit_side_image BOOLEAN NOT NULL DEFAULT 0,
  quiet_mode BOOLEAN NOT NULL DEFAULT 0,
  lang VARCHAR(2) NOT NULL DEFAULT 'en',
  locale VARCHAR(2) NOT NULL DEFAULT 'US',
  PRIMARY KEY (user_id)
);