import pool from '../db.js';
import { BaseService } from './BaseService.js';
import { Tables } from './tables.js';
import { buildPaginatedQuery } from './utils.js';

class ServicesService extends BaseService {
    constructor(db) {
        super(db);
    }

    // async getCenterServices(centerId, filters) {

    //     const page = parseInt(filters.page) || 1;
    //     const limit = parseInt(filters.limit) || 5;

    //     const { query, countQuery, values } = buildPaginatedQuery({
    //         baseTable: 'services',
    //         where: {
    //             center_id: centerId,
    //             active: filters.status === undefined ? '' : filters.status === 'active' ? true : false
    //         },
    //         filters: {
    //             search: filters.search,
    //             sortBy: filters.sortBy,
    //             sortOrder: filters.sortOrder,
    //         },
    //         searchFields: ['name', 'description'],
    //         allowedSortFields: ['id', 'created_at', 'name'],
    //         defaultSortBy: 'id',
    //         defaultSortOrder: 'asc',
    //         page,
    //         limit,
    //     });

    //     console.log("QUERY", query);

    //     const data = await this.db.query(query, values);
    //     const countResult = await this.db.query(countQuery, values.slice(0, values.length - 2));
    //     const total = parseInt(countResult.rows[0].count, 10);

    //     return {
    //         results: data.rows,
    //         total,
    //     };
    // };

    async getCenterServices(centerId){
        return this.findAllByField(Tables.Services, 'center_id', centerId);
    }

    async getServiceSubservices(serviceId){
        return this.findAllByField(Tables.Subservices, 'service_id', serviceId);
    }

    async toggleServiceStatus(serviceId, status) {

        const updateSql = `UPDATE ${Tables.Services} SET active = $2 WHERE id = $1 RETURNING *`;
        const result = await this.db.query(updateSql, [serviceId, status]);

        if (result.rowCount === 0) {
            const error = new Error('Service not found');
            error.statusCode = 404;
            throw error;
        }

        return result.rows[0];
    };

};

export const servicesService = new ServicesService(pool)