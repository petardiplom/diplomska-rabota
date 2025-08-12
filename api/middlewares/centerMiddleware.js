import db from "../db.js";

export const requireCenterAccess = async (req, res, next) => {
  const centerId = req.header("X-Center-Id");

  if (!centerId) {
    return res.status(400).json({ error: "Missing X-Center-Id header" });
  }

  // TODO FIX USER ID CHECK BELOW
  // check if owner or check if staff

  try {
    const result = await db.query(
      `SELECT DISTINCT c.* FROM centers c
        LEFT OUTER JOIN center_staff cs ON c.id = cs.center_id
       WHERE c.id = $1 AND (c.owner_id = $2 OR cs.user_id = $2)`,
      [centerId, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Unauthorized access to center" });
    }

    req.center = result.rows[0];
    next();
  } catch (err) {
    console.error("DB error in requireCenterAccess", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
