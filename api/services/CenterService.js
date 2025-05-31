import pool from '../db.js';

class CenterService {
    constructor(db) {
        this.db = db;
    }

    async getUserCenters(userId) {
        const centers = await this.db.query('SELECT * FROM centers WHERE owner_id = $1', [userId]);
        return centers.rows;
    };

};

export const centerService = new CenterService(pool)