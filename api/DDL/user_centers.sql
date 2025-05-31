CREATE TABLE user_centers (
  user_id INTEGER,
  center_id INTEGER,
  role user_role,
  PRIMARY KEY (user_id, center_id)
)