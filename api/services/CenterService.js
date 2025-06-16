import pool from '../db.js';
import { BaseService } from './BaseService.js';
import { Tables } from './tables.js';

class CenterService extends BaseService {
    constructor(db) {
       super(db);
    }

    async getUserCenters(userId) {
        return this.findAllByField(Tables.Centers, 'owner_id', userId);
    };

    async getCenterById(centerId) {
        return this.findById(Tables.Centers, centerId);
    };

    async addUserCenter(data) {

        const allowedFields = [
            'owner_id', 'name', 'email', 'phone', 'address', 'image_url',
            'street', 'city', 'state', 'postal_code', 'country',
            'latitude', 'longitude'
        ];

        return this.insert(Tables.Centers, data, allowedFields);
    };

};

export const centerService = new CenterService(pool)