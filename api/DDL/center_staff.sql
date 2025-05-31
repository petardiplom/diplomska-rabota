CREATE TABLE center_staff (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES user(id),
    center_id INTEGER NOT NULL REFERENCES center(id),
    role staff_role NOT NULL,
    archived_at TIMESTAMP,
    UNIQUE(user_id, center_id)
)