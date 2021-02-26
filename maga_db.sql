CREATE DATABASE IF NOT EXISTS maga_db;
USE maga_db;

CREATE TABLE IF NOT EXISTS user_credentials (
	email varchar(100) NOT NULL,
    password_hash varchar(300) NOT NULL
);
ALTER TABLE user_credentials ADD PRIMARY KEY (email);

CREATE TABLE IF NOT EXISTS users (
	id int(10) NOT NULL,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    pic blob,
    extra varchar(200)
);
ALTER TABLE users ADD PRIMARY KEY (id);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id int(10) NOT NULL,
	role_id int(10) NOT NULL,
    name varchar(100) NOT NULL
);
ALTER TABLE user_roles ADD PRIMARY KEY (role_id);
ALTER TABLE user_roles ADD FOREIGN KEY (user_id) REFERENCES users(id);

CREATE TABLE IF NOT EXISTS media (
	id int(10) NOT NULL,
    link varchar(100) NOT NULL,
    type varchar(100) NOT NULL
);
ALTER TABLE media ADD PRIMARY KEY (id);

CREATE TABLE IF NOT EXISTS content (
	id int(10) NOT NULL,
    status ENUM('publicat', 'in asteptare', 'ciorna') NOT NULL,
    type_id int(10) NOT NULL,
    title varchar(100) NOT NULL,
    content varchar(100) NOT NULL,
    id_media int(10) NOT NULL,
    id_author int(10) NOT NULL,
    extra varchar(200)
);
ALTER TABLE content ADD PRIMARY KEY (id);
ALTER TABLE content ADD FOREIGN KEY (id_media) REFERENCES media(id);

CREATE TABLE IF NOT EXISTS edition (
	id int(10) NOT NULL,
    name varchar(100) NOT NULL,
    min_courses int(10) NOT NULL,
    max_courses int(10) NOT NULL,
    min_conferences int(10) NOT NULL,
    max_conferences int(10) NOT NULL
);
ALTER TABLE edition ADD PRIMARY KEY (id);

CREATE TABLE IF NOT EXISTS edition_content (
	id_relation int(10) NOT NULL,
    id_content int(10) NOT NULL,
    id_edition int(10) NOT NULL
);
ALTER TABLE edition_content ADD PRIMARY KEY (id_relation);
ALTER TABLE edition_content ADD FOREIGN KEY (id_content) REFERENCES content(id);
ALTER TABLE edition_content ADD FOREIGN KEY (id_edition) REFERENCES edition(id);

CREATE TABLE IF NOT EXISTS content_type (
	id int(10) NOT NULL,
    name varchar(100) NOT NULL
);
ALTER TABLE content_type ADD PRIMARY KEY (id);

CREATE TABLE IF NOT EXISTS content_category (
	id_category int(10) NOT NULL,
    id_content int(10) NOT NULL,
    name varchar(100) NOT NULL
);
ALTER TABLE content_category ADD PRIMARY KEY (id_category);
ALTER TABLE content_category ADD FOREIGN KEY (id_content) REFERENCES content(id);