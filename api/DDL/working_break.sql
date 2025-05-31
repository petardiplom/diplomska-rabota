CREATE TABLE work_break (
    id SERIAL PRIMARY KEY,
    schedule_id INTEGER NOT NULL REFERENCES working_schedule(id) ON DELETE CASCADE,
    break_start TIME NOT NULL,
    break_end TIME NOT NULL
);