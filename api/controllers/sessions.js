import { sessionService } from "../services/SessionService.js";

// GET
export const getCenterSessions = async (req, res, next) => {
  try {
    const center = req.center;
    const sessions = await sessionService.getCenterSessions(center.id);
    return res.json(sessions);
  } catch (error) {
    next(error);
  }
};

export const getSessionSubscriptions = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const subscriptions = await sessionService.getSessionSubscriptions(
      sessionId
    );
    return res.json(subscriptions);
  } catch (error) {
    next(error);
  }
};

// POST

export const addSessionSubscription = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { customerId } = req.body;
    const subscription = await sessionService.addSessionSubscription(
      sessionId,
      customerId
    );
    return res.json(subscription);
  } catch (error) {
    next(error);
  }
};

export const createCenterSession = async (req, res, next) => {
  try {
    const center = req.center;
    const data = req.body;
    const session = await sessionService.createCenterSession({
      center_id: center.id,
      ...data,
    });

    return res.json(session);
  } catch (error) {
    next(error);
  }
};

//PATCH
export const cancelSession = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const session = await sessionService.cancelSession(sessionId, req.user.id);
    return res.json(session);
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const { subscriptionId } = req.params;
    const { sessionId } = req.body;
    const subscription = await sessionService.cancelSubscription(
      subscriptionId,
      sessionId,
      req.user.id
    );
    return res.json(subscription);
  } catch (error) {
    next(error);
  }
};
