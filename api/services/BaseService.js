import { buildInsertQuery, buildUpdateQuery } from "./utils.js";

export class BaseService {
    constructor(db) {
        this.db = db;
    }

    async findById(table, id) {
        const result = await this.db.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
        return result.rows[0] || null;
    }

    async findAllByField(table, field, value, ignoreArchived = false) {

        let sql = `SELECT * FROM ${table} WHERE ${field} = $1 ORDER BY id ASC`

        if(ignoreArchived){
            sql = `SELECT * FROM ${table} WHERE ${field} = $1 AND archived_at IS NULL ORDER BY id ASC`
        }
        
        const result = await this.db.query(sql, [value]);
        return result.rows;
    }

    async insert(table, data, allowedFields, returning = '*') {
        const { query, values } = buildInsertQuery(table, data, allowedFields, returning);

        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async update(table, data, allowedFields, whereClause, whereValues, returning = '*') {
        const { query, values } = buildUpdateQuery(table, data, allowedFields, whereClause, whereValues, returning);
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
}