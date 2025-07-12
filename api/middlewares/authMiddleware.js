import admin from "../admin/firebaseAdmin.js";
import { userService } from "../services/UserService.js";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user =  await userService.getUserByFirebaseUid(decodedToken.user_id);
    req.user = user;
    req.firebaseUser = decodedToken;
    next();
  } catch (err) {
    console.error('Token verification failed', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};