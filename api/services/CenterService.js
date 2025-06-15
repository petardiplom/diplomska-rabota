import pool from '../db.js';

class CenterService {
    constructor(db) {
        this.db = db;
    }

    async getUserCenters(userId) {
        const centers = await this.db.query('SELECT * FROM centers WHERE owner_id = $1', [userId]);
        return centers.rows;
    };

    async getCenterById(centerId) {
        const center = await this.db.query('SELECT * FROM centers WHERE id = $1', [centerId]);
        return center.rows[0] || null;
    };

};

export const centerService = new CenterService(pool)