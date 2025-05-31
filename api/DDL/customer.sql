CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    center_id INTEGER REFERENCES center(id) ON DELETE CASCADE,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    phone TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    archived_at TIMESTAMP,
);