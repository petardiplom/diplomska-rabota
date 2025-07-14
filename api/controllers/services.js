import { defaultError } from "../error.js";
import { servicesService } from "../services/ServicesService.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// GET
export const getServicesByCenter = async (req, res, next) => {
  try {
    const center = req.center;
    const response = await servicesService.getCenterServices(center.id);

    // await delay(2000);

    return res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getArchivedServicesByCenter = async (req, res, next) => {
  try {
    const center = req.center;
    const response = await servicesService.getArchivedCenterServices(center.id);

    return res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getServiceSubservices = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const response = await servicesService.getServiceSubservices(serviceId);

    return res.json(response);
  } catch (error) {
    next(error);
  }
};

//PATCH
export const toggleServiceStatus = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const { status } = req.body;

    if (typeof status !== "boolean") {
      const err = defaultError(400, "Status must be boolean");
      next(err);
    }

    const service = await servicesService.toggleServiceStatus(
      serviceId,
      status
    );
    return res.json(service);
  } catch (error) {
    next(error);
  }
};

export const editService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const { name, description, color } = req.body;

    const service = await servicesService.editService(serviceId, {
      name,
      description,
      color,
    });
    return res.json(service);
  } catch (error) {
    next(error);
  }
};

export const editSubservice = async (req, res, next) => {
  try {
    const { subserviceId } = req.params;
    const { name, description, price } = req.body;

    const subservice = await servicesService.editSubservice(subserviceId, {
      name,
      description,
      price,
    });
    return res.json(subservice);
  } catch (error) {
    next(error);
  }
};

export const archiveService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const service = await servicesService.archiveService(serviceId);
    return res.json(service);
  } catch (error) {
    next(error);
  }
};

export const restoreService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const service = await servicesService.restoreService(serviceId);
    return res.json(service);
  } catch (error) {
    next(error);
  }
};
