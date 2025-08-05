CREATE TABLE working_schedules (
    id SERIAL PRIMARY KEY,
    center_id INTEGER REFERENCES centers(id) ON DELETE CASCADE,
    center_staff_id INTEGER REFERENCES center_staff(id) ON DELETE CASCADE,
    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7), -- 7 = Sunday
    is_closed BOOLEAN DEFAULT FALSE,
    work_start TIME,
    work_end TIME,
    UNIQUE(center_id, center_staff_id, day_of_week),
    CHECK (
        (is_closed = TRUE AND work_start IS NULL AND work_end IS NULL)
        OR
        (is_closed = FALSE AND work_start IS NOT NULL AND work_end IS NOT NULL)
    ),
    CHECK (work_start < work_end)
);

INSERT INTO working_schedules (center_id, center_staff_id, day_of_week, is_closed, work_start, work_end)
VALUES 
  (1, NULL, 1, FALSE, '09:00', '17:00'),
  (1, NULL, 2, FALSE, '10:00', '16:00'),
  (1, NULL, 3, TRUE, NULL, NULL),
  (1, NULL, 4, FALSE, '08:30', '17:30'),
  (1, NULL, 5, FALSE, '09:00', '18:00'),
  (1, NULL, 6, FALSE, '10:00', '14:00'),
  (1, NULL, 7, TRUE, NULL, NULL);