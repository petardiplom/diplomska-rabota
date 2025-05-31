CREATE TRIGGER trg_check_reservation_conflict
BEFORE INSERT OR UPDATE ON reservations
FOR EACH ROW
EXECUTE FUNCTION check_time_conflicts();

CREATE TRIGGER trg_check_event_conflict
BEFORE INSERT OR UPDATE ON events
FOR EACH ROW
EXECUTE FUNCTION check_time_conflicts();

CREATE OR REPLACE FUNCTION check_time_conflicts()
RETURNS TRIGGER AS $$
DECLARE
  conflict_count INT;
BEGIN
  IF NEW.status <> 'active' THEN
    RETURN NEW;
  END IF;

  -- Check overlap with other reservations
  SELECT COUNT(*) INTO conflict_count
  FROM reservations
  WHERE status = 'active'
    AND id <> COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000')  -- avoid self-check
    AND time_range && NEW.time_range;

  IF conflict_count > 0 THEN
    RAISE EXCEPTION 'Time conflict with another reservation';
  END IF;

  -- Check overlap with events
  SELECT COUNT(*) INTO conflict_count
  FROM events
  WHERE status = 'active'
    AND id <> COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000')  -- avoid self-check
    AND time_range && NEW.time_range;

  IF conflict_count > 0 THEN
    RAISE EXCEPTION 'Time conflict with an event';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;