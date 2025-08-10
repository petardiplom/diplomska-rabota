
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    subservice_id INTEGER REFERENCES subservices(id) ON DELETE NO ACTION,
    customer_id INTEGER REFERENCES customers(id) ON DELETE NO ACTION,
    center_id INTEGER REFERENCES centers(id) ON DELETE NO ACTION,
    staff_id INTEGER REFERENCES center_staff(id),
    price NUMERIC(10,2) NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    duration INTEGER NOT NULL,
    status subscription_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    cancelled_at TIMESTAMPTZ,
    cancelled_by INTEGER REFERENCES center_staff(id)
);