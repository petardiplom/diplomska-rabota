CREATE TABLE subservices (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    duration INTEGER NOT NULL CHECK (duration >= 0 AND duration <= 360),
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    created_at TIMESTAMP DEFAULT NOW(),
    archived_at TIMESTAMP
);

INSERT INTO subservices (service_id, name, description, price, duration, capacity)
VALUES
(1, 'Standard Haircut', 'A simple haircut including wash and style.', 15.00, 30, 1),
(1, 'Old Haircut', 'Haircut tailored for people over 70.', 10.00, 20, 1),
(1, 'Premium Haircut', 'Includes haircut, wash, scalp massage, and style.', 25.00, 45, 1),
(2, 'Standard Beard trim', 'A simple beard trim including wash and style.', 9.00, 10, 1);