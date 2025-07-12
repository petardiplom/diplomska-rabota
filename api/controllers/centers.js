import { defaultError } from "../error.js";
import { centerService } from "../services/CenterService.js"

// GET
export const getUserCenters = async (req, res, next) => {
    try {
        console.log(req.user);
        const centers = await centerService.getUserCenters(req.user.id);
        const response = {
            results: centers,
            total: 10,
        }
        return res.json(centers);
    } catch (error) {
        next(error);
    }

}

export const getCenterById = async (req, res, next) => {
    try {
        const { centerId } = req.params;
        const center = await centerService.getCenterById(centerId);
        
        return res.json(center);
    } catch (error) {
        next(error);
    }

}

// POST

export const addUserCenter = async (req, res, next) => {
    try {
        const centers = await centerService.addUserCenter({ owner_id: req.user.id, ...req.body });
        return res.json(centers);
    } catch (error) {
        next(error);
    }

}


