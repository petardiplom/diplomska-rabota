CREATE TABLE service_staff (
    id SERIAL PRIMARY KEY,
    service_id INTEGER NOT NULL REFERENCES service(id) ON DELETE CASCADE,
    staff_id INTEGER NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    UNIQUE(service_id, staff_id)
);