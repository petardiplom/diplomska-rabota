CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    center_id INTEGER REFERENCES center(id) ON DELETE CASCADE,
    subservice_id INTEGER REFERENCES subservice(id) ON DELETE CASCADE,
    center_id UUID REFERENCES center(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    starts_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    cancelled_at TIMESTAMPTZ,
    cancelled_by UUID REFERENCES users(id);
);