
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES sessions(id) ON DELETE NO ACTION,
    customer_id INTEGER REFERENCES customers(id) ON DELETE NO ACTION,
    status subscription_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    cancelled_at TIMESTAMPTZ,
    cancelled_by INTEGER
);