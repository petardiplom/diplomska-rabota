import pool from '../db.js';

class UserService {
    constructor(db) {
        this.db = db;
    }

    async getAllUsers() {
        const customers = await this.db.query('SELECT * FROM customers');
        return customers.rows;
    }

    async getUserById(id){
        const customer = await this.db.query('SELECT * FROM customers WHERE id = $1', [id]);
        return customer.rows[0]
    }

    async getUserByFirebaseUid(firebaseId){
        const customer = await this.db.query('SELECT * FROM users WHERE firebase_uid = $1', [firebaseId]);
        return customer.rows[0]
    }

};

export const userService = new UserService(pool)