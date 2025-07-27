import { staffService } from "../services/StaffService.js";

// GET
export const getCenterStaff = async (req, res, next) => {
  try {
    const center = req.center;
    const staff = await staffService.getCenterStaff(center.id);
    return res.json(staff);
  } catch (error) {
    next(error);
  }
};
