CREATE TRIGGER trg_cancel_event_customers
AFTER UPDATE ON events
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION cancel_event_customers();


CREATE OR REPLACE FUNCTION cancel_event_customers()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'cancelled' AND OLD.status <> 'cancelled' THEN
        UPDATE event_customers
        SET status = 'cancelled',
            cancelled_at = NEW.cancelled_at,
            cancelled_by = NEW.cancelled_by
        WHERE event_id = NEW.id AND status <> 'cancelled';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;