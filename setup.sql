DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS events;
/*DROP TABLE IF EXISTS users; 
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors; */



CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    first           VARCHAR(255) NOT NULL,
    last            VARCHAR(255) NOT NULL,
    email           VARCHAR(50) NOT NULL UNIQUE,
    password_hash   VARCHAR NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profile_url     TEXT,
    bio             TEXT
);

CREATE TABLE authors (
    id             SERIAL PRIMARY KEY,
    name           VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE books (
    id              SERIAL PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    author_id       INT REFERENCES authors(id) NOT NULL,
    description     VARCHAR(255),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cover_url       TEXT, 
    year            INTEGER 
);

CREATE TABLE events (
    id              SERIAL PRIMARY KEY,
    book_id         INT REFERENCES books(id) NOT NULL,
    creator_id      INT REFERENCES users(id) NOT NULL,
    event_date      DATE,
    event_time      TIME
);

CREATE TABLE attendance (
    id              SERIAL PRIMARY KEY,
    user_id         INT REFERENCES users(id) NOT NULL,
    event_id        INT REFERENCES events(id) NOT NULL,
    attendance      BOOLEAN DEFAULT false,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

