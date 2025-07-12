import { buildInsertQuery } from "./utils.js";

export class BaseService {
    constructor(db) {
        this.db = db;
    }

    async findById(table, id) {
        const result = await this.db.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
        return result.rows[0] || null;
    }

    async findAllByField(table, field, value) {
        const result = await this.db.query(`SELECT * FROM ${table} WHERE ${field} = $1 ORDER BY id ASC`, [value]);
        return result.rows;
    }

    async insert(table, data, allowedFields, returning = '*') {
        const { query, values } = buildInsertQuery(table, data, allowedFields, returning);

        const result = await this.db.query(query, values);
        return result.rows[0];
    }
}