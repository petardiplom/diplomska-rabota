import { defaultError } from "../error.js";
import { userService } from "../services/UserService.js";

export const getUsers = async (_, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const user = await userService.getUserById(req.params.id);
  if (user) {
    return res.json(user);
  }
  return next(defaultError(404, "User not found!"));
};

export const getUserByFirebaseId = async (req, res, next) => {
  const user = req.user;
  if (user) {
    return res.json(user);
  }
  return next(defaultError(404, "User not found!"));
};
