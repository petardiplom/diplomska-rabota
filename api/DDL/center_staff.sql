CREATE TABLE center_staff (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    center_id INTEGER NOT NULL REFERENCES centers(id),
    role staff_role NOT NULL,
    archived_at TIMESTAMPTZ,
    UNIQUE(user_id, center_id)
)