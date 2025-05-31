CREATE TABLE subservice (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES service(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2),
    archived_at TIMESTAMP,
);