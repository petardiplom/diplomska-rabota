CREATE TABLE event_customers (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES event(id) ON DELETE CASCADE,
    customer_id INTEGER REFERENCES customer(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'active',
    cancelled_at TIMESTAMP,
    cancelled_by UUID REFERENCES users(id),
    CONSTRAINT one_customer_per_event UNIQUE (event_id, customer_id)
)