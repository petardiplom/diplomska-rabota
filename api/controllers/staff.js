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

export const getSubserviceStaff = async (req, res, next) => {
  try {
    const center = req.center;
    const { subserviceId } = req.params;
    const staff = await staffService.getSubserviceStaff(
      subserviceId,
      center.id
    );
    return res.json(staff);
  } catch (error) {
    next(error);
  }
};

//POST
export const addCenterStaff = async (req, res, next) => {
  try {
    const center = req.center;
    const data = req.body;
    const staff = await staffService.addCenterStaff(center.id, data);
    return res.json(staff);
  } catch (error) {
    next(error);
  }
};
