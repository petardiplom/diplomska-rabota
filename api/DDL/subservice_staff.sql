CREATE TABLE subservice_staff (
    id SERIAL PRIMARY KEY,
    subservice_id INTEGER NOT NULL REFERENCES subservice(id) ON DELETE CASCADE,
    staff_id INTEGER NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    UNIQUE(subservice_id, staff_id)
);