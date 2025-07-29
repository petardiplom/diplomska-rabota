import { customerService } from "../services/CustomerService.js";

// GET
export const getCenterCustomers = async (req, res, next) => {
  try {
    const center = req.center;
    const customers = await customerService.getCenterCustomers(center.id);
    return res.json(customers);
  } catch (error) {
    next(error);
  }
};

export const getArchivedCenterCustomers = async (req, res, next) => {
  try {
    const center = req.center;
    const customers = await customerService.getArchivedCenterCustomers(
      center.id
    );
    return res.json(customers);
  } catch (error) {
    next(error);
  }
};

export const getCustomerById = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const customer = await customerService.getCustomerById(customerId);

    return res.json(customer);
  } catch (error) {
    next(error);
  }
};

// POST

export const addCustomer = async (req, res, next) => {
  try {
    const center = req.center;
    const customer = await customerService.addCustomer(center.id, req.body);
    return res.json(customer);
  } catch (error) {
    next(error);
  }
};

// PATCH

export const updateCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const customer = await customerService.updateCustomer(customerId, {
      ...req.body,
    });
    return res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const archiveCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const customer = await customerService.archiveCustomer(customerId);
    return res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const restoreCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const customer = await customerService.restoreCustomer(customerId);
    return res.json(customer);
  } catch (error) {
    next(error);
  }
};
