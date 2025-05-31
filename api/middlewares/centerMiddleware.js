import db from '../db.js';

export const requireCenterAccess = async (req, res, next) => {
  const centerId = req.header('X-Center-Id');

  if (!centerId) {
    return res.status(400).json({ error: 'Missing X-Center-Id header' });
  }

  // Optional: validate center exists and user has access
  try {
    const result = await db.query(
      `SELECT * FROM centers WHERE id = $1 AND owner_id = $2`,
      [centerId, req.user.uid] // or req.user.id if you map Firebase users to a local users table
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: 'Unauthorized access to center' });
    }

    req.center = result.rows[0];
    next();
  } catch (err) {
    console.error('DB error in requireCenterAccess', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};