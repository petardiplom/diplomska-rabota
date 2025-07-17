CREATE TABLE work_breaks (
    id SERIAL PRIMARY KEY,
    schedule_id INTEGER NOT NULL REFERENCES working_schedules(id) ON DELETE CASCADE,
    break_start TIME NOT NULL,
    break_end TIME NOT NULL,
    CHECK (break_start < break_end)
);

INSERT INTO work_breaks (schedule_id, break_start, break_end)
VALUES 
  (1, '12:00', '12:30');

INSERT INTO work_breaks (schedule_id, break_start, break_end)
VALUES 
  (4, '11:00', '11:15');

INSERT INTO work_breaks (schedule_id, break_start, break_end)
VALUES 
  (5, '12:30', '13:00'),
  (5, '15:30', '15:45');