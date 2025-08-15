import admin from "../admin/firebaseAdmin.js";
import pool from "../db.js";
import { defaultError } from "../error.js";
import { BaseService } from "./BaseService.js";
import { Tables } from "./tables.js";

class StaffService extends BaseService {
  constructor(db) {
    super(db);
  }

  async getCenterStaff(center_id) {
    const sql = `
    SELECT cf.*, u.username, u.email FROM ${Tables.CenterStaff} cf
        INNER JOIN ${Tables.Users} u ON cf.user_id = u.id
    WHERE cf.center_id = $1`;

    const response = await this.db.query(sql, [center_id]);

    return response.rows;
  }

  async getSubserviceStaff(subservice_id, center_id) {
    const sql = `
    SELECT cf.*, u.username, u.email FROM ${Tables.CenterStaff} cf
        INNER JOIN ${Tables.SubserviceStaff} ss ON cf.id = ss.center_staff_id
        INNER JOIN ${Tables.Users} u ON cf.user_id = u.id
    WHERE ss.subservice_id = $1 AND cf.center_id = $2`;

    const response = await this.db.query(sql, [subservice_id, center_id]);

    return response.rows;
  }

  async addCenterStaff(center_id, data) {
    if (data.role !== "manager" && data.role !== "staff") {
      throw defaultError("400", "Invalid role");
    }

    await this.withTransaction(async (client) => {
      let firebaseUser;
      let isNewUser = false;

      try {
        try {
          firebaseUser = await admin.auth().createUser({
            email: data.email,
            password: process.env.DEFAULT_USER_PASSWORD,
            displayName: data.username,
            emailVerified: false,
          });
          isNewUser = true;
        } catch (error) {
          if (error.code === "auth/email-already-exists") {
            firebaseUser = await admin.auth().getUserByEmail(data.email);
          } else {
            throw error;
          }
        }

        const user = await this.insert(
          Tables.Users,
          { ...data, firebase_uid: firebaseUser.uid },
          [
            "email",
            "username",
            "firstname",
            "lastname",
            "role",
            "firebase_uid",
          ],
          client
        );

        await this.insert(
          Tables.CenterStaff,
          { center_id: center_id, user_id: user.id, role: data.role },
          ["center_id", "user_id", "role"],
          client
        );
        return user;
      } catch (error) {
        if (isNewUser && firebaseUser?.uid) {
          await admin
            .auth()
            .deleteUser(firebaseUser.uid)
            .catch(() =>
              console.log("SOMETHING WENT WRONG DELETING FIREBASE USER!")
            );
        }
        throw error;
      }
    });
  }
}

export const staffService = new StaffService(pool);
