CREATE TABLE center_images (
    id SERIAL PRIMARY KEY,
    center_id INTEGER REFERENCES centers(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    type image_type NOT NULL DEFAULT 'gallery', -- profile, gallery
    created_at TIMESTAMP DEFAULT NOW(),
    archived_at TIMESTAMP
);