CREATE TABLE service (
    id SERIAL PRIMARY KEY,
    center_id INTEGER REFERENCES center(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    archived_at TIMESTAMP,
);