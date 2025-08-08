import pool from "../db.js";
import { BaseService } from "./BaseService.js";
import { Tables } from "./tables.js";
import { buildPaginatedQuery } from "./utils.js";

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

  async getCenterServices(centerId) {
    return this.findAllByField(Tables.Services, "center_id", centerId, true);
  }

  async getArchivedCenterServices(centerId) {
    const sql = `SELECT * FROM ${Tables.Services} WHERE center_id = $1 AND archived_at IS NOT NULL ORDER BY id ASC`;
    const response = await this.db.query(sql, [centerId]);
    return response.rows;
  }

  async getCenterSubservices(centerId) {
    const sql = `SELECT ss.* FROM ${Tables.Subservices} ss 
      INNER JOIN ${Tables.Services} s ON ss.service_id = s.id
    WHERE s.center_id = $1 ORDER BY ss.id ASC`;
    const response = await this.db.query(sql, [centerId]);
    return response.rows;
  }

  async getServiceSubservices(serviceId) {
    const sql = `
    SELECT s.*, COALESCE(jsonb_agg(jsonb_build_object('id', ss.center_staff_id, 'email', u.email)) FILTER (WHERE ss.id IS NOT NULL),
                '[]'::jsonb
            ) AS staff FROM ${Tables.Subservices} s
      LEFT OUTER JOIN ${Tables.SubserviceStaff} ss ON s.id = ss.subservice_id
      LEFT OUTER JOIN ${Tables.CenterStaff} cs ON ss.center_staff_id = cs.id
      LEFT OUTER JOIN ${Tables.Users} u ON cs.user_id = u.id
    WHERE s.service_id = $1
    GROUP BY s.id
    `;
    const response = await this.db.query(sql, [serviceId]);
    return response.rows;
  }

  async addService(data) {
    const allowedFields = ["center_id", "name", "description", "color"];
    return this.insert(Tables.Services, data, allowedFields);
  }

  async editService(serviceId, data) {
    const allowedFields = ["name", "description", "color"];
    return this.update(Tables.Services, data, allowedFields, "id = $4", [
      serviceId,
    ]);
  }

  async addSubservice(data) {
    const allowedFields = [
      "service_id",
      "name",
      "description",
      "price",
      "duration",
      "capacity",
    ];
    return this.insert(Tables.Subservices, data, allowedFields);
  }

  async editSubservice(subserviceId, data) {
    const allowedFields = [
      "name",
      "description",
      "price",
      "duration",
      "capacity",
    ];

    return this.update(Tables.Subservices, data, allowedFields, "id = $6", [
      subserviceId,
    ]);
  }

  async toggleServiceStatus(serviceId, status) {
    const updateSql = `UPDATE ${Tables.Services} SET active = $2 WHERE id = $1 RETURNING *`;
    const result = await this.db.query(updateSql, [serviceId, status]);

    if (result.rowCount === 0) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }

    return result.rows[0];
  }

  async archiveService(serviceId) {
    const archivedAt = new Date();
    const updateSql = `UPDATE ${Tables.Services} SET archived_at = $2, active = false WHERE id = $1 RETURNING *`;
    const result = await this.db.query(updateSql, [serviceId, archivedAt]);

    if (result.rowCount === 0) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }

    return result.rows[0];
  }

  async restoreService(serviceId) {
    const updateSql = `UPDATE ${Tables.Services} SET archived_at = null WHERE id = $1 RETURNING *`;
    const result = await this.db.query(updateSql, [serviceId]);

    if (result.rowCount === 0) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }

    return result.rows[0];
  }
}

export const servicesService = new ServicesService(pool);
