CREATE TABLE customer_orders (
	id SERIAL PRIMARY KEY,
	center_id INTEGER NOT NULL REFERENCES centers(id) ON DELETE NO ACTION,
	customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE NO ACTION,
	reservation_id INTEGER REFERENCES reservations(id) ON DELETE NO ACTION,
	subscription_id INTEGER REFERENCES subscriptions(id) ON DELETE NO ACTION,
	created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE NO ACTION,
	payment_method payment_method NOT NULL DEFAULT 'cash',
	price NUMERIC(10,2) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	CHECK (
    (reservation_id IS NOT NULL AND subscription_id IS NULL)
    OR (reservation_id IS NULL AND subscription_id IS NOT NULL)
    )
);