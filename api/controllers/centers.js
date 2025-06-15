import { defaultError } from "../error.js";
import { centerService } from "../services/CenterService.js"


export const getUserCenters = async (req, res, next) => {
    try {
        const centers = await centerService.getUserCenters(req.user.id);
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
