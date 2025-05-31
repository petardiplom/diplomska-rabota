CREATE TABLE reservation (
    id SERIAL PRIMARY KEY,
    subservice_id INTEGER REFERENCES subservice(id) ON DELETE CASCADE,
    customer_id INTEGER REFERENCES customer(id) ON DELETE CASCADE,
    center_id UUID REFERENCES center(id) ON DELETE RESTRICT,
    staff_id INTEGER REFERENCES users(id),
    price NUMERIC(10,2) NOT NULL,
    starts_at TIMESTAMP NOT NULL,
    duration_minutes INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    cancelled_at TIMESTAMP,
    cancelled_by UUID REFERENCES users(id);
);