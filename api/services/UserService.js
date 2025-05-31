import pool from '../db.js';

class UserService {
    constructor(db) {
        this.db = db;
    }

    async getAllUsers() {
        const customers = await this.db.query('SELECT * FROM customers');
        // console.log("CUSTOMERS", customers.rows);
        return customers.rows;
    }

    async getUserById(id){
        const customer = await this.db.query('SELECT * FROM customers WHERE id = $1', [id]);
        console.log("CUSTOMER", customer.rows[0]);
        return customer.rows[0]
    }

};

export const userService = new UserService(pool)