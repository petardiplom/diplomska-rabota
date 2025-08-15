import { reservationService } from "../services/ReservationService.js";

// GET
export const getCenterReservations = async (req, res, next) => {
  try {
    const center = req.center;
    const reservations = await reservationService.getCenterReservations(
      center.id
    );
    return res.json(reservations);
  } catch (error) {
    next(error);
  }
};

// POST

export const createCenterReservation = async (req, res, next) => {
  try {
    const center = req.center;
    const user = req.user;
    const data = req.body;
    const reservation = await reservationService.createCenterReservation({
      center_id: center.id,
      user_id: user.id,
      ...data,
    });

    return res.json(reservation);
  } catch (error) {
    next(error);
  }
};

//PATCH
export const cancelReservation = async (req, res, next) => {
  try {
    const { reservationId } = req.params;
    const reservation = await reservationService.cancelReservation(
      reservationId,
      req.user.id
    );
    return res.json(reservation);
  } catch (error) {
    next(error);
  }
};
