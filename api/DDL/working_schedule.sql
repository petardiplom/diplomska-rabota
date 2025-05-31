CREATE TABLE working_schedule (
    id SERIAL PRIMARY KEY,
    center_id INTEGER REFERENCES center(id) ON DELETE CASCADE,
    staff_id INTEGER REFERENCES user(id) ON DELETE CASCADE, -- NULL = applies to whole center
    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Sunday
    is_closed BOOLEAN DEFAULT FALSE,
    work_start TIME,
    work_end TIME,
    UNIQUE(center_id, staff_user_id, day_of_week)
);