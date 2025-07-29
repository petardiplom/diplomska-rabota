CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    center_id INTEGER REFERENCES centers(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    phone TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    archived_at TIMESTAMP,
);

INSERT INTO customers (center_id, email, firstname, lastname, phone)
VALUES 
    (1, 'john.doe@example.com', 'John', 'Doe', '+1234567890'),
    (1, 'jane.smith@example.com', 'Jane', 'Smith', '+1234567891'),
    (1, 'alice.jones@example.com', 'Alice', 'Jones', '+1234567892'),
    (1, 'bob.brown@example.com', 'Bob', 'Brown', '+1234567893'),
    (1, 'carol.white@example.com', 'Carol', 'White', '+1234567894'),
    (1, 'dave.green@example.com', 'Dave', 'Green', '+1234567895'),
    (1, 'emily.black@example.com', 'Emily', 'Black', '+1234567896'),
    (1, 'frank.gray@example.com', 'Frank', 'Gray', '+1234567897'),
    (1, 'grace.adams@example.com', 'Grace', 'Adams', '+1234567898'),
    (1, 'henry.clark@example.com', 'Henry', 'Clark', '+1234567899');