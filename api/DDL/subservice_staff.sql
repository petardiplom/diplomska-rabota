    CREATE TABLE subservice_staff (
        id SERIAL PRIMARY KEY,
        subservice_id INTEGER NOT NULL REFERENCES subservices(id) ON DELETE CASCADE,
        center_staff_id INTEGER NOT NULL REFERENCES center_staff(id) ON DELETE CASCADE,
        UNIQUE(subservice_id, center_staff_id)
    );

    INSERT INTO subservice_staff (subservice_id, center_staff_id) VALUES (1, 2);