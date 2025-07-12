CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    center_id INTEGER REFERENCES centers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    color TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    archived_at TIMESTAMP,
);

INSERT INTO services (center_id, name, description, active, color)
VALUES 
(1, 'Haircut', 'Basic haircut service for all ages.', TRUE, '#FF5733'),
(1, 'Beard Trim', 'Quick beard shaping and trimming.', TRUE, '#33C3FF'),
(1, 'Hair Coloring', 'Full hair coloring with premium dyes.', FALSE, '#9B59B6'),
(2, 'Massage Therapy', '60-minute full-body massage session.', TRUE, '#2ECC71'),
(2, 'Facial Treatment', 'Deep cleansing and moisturizing facial.', TRUE, '#F1C40F');