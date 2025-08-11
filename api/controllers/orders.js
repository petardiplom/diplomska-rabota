import { orderService } from "../services/OrderService.js";

// GET
export const getCenterOrders = async (req, res, next) => {
  try {
    const center = req.center;
    const orders = await orderService.getCenterOrders(center.id);
    return res.json(orders);
  } catch (error) {
    next(error);
  }
};
