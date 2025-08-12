import express from "express";
import {
  getUserByFirebaseId,
  getUserById,
  getUsers,
} from "../controllers/users.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", getUsers);

router.get("/users/me", authenticateUser, getUserByFirebaseId);

router.get("/users/:id", getUserById);

export default router;
