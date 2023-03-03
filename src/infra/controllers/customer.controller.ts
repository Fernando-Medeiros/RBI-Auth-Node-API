import type { Request, Response } from "express";
import {
  StatusCreated,
  StatusOK,
  StatusOkNoContent,
} from "@src/helpers/http.protocols";

import { CustomerHandler as handler } from "@inf/handlers/customer.handler";

export const getAllCustomers = async (_req: Request, res: Response) => {
  const customers = await handler.getAllCustomers();

  return new StatusOK(res, customers);
};

export const getCustomerById = async (req: Request, res: Response) => {
  const customer = await handler.getCustomerById(req);

  return new StatusOK(res, customer);
};

export const createCustomer = async (req: Request, res: Response) => {
  await handler.createCustomer(req);

  return new StatusCreated(res);
};

export const updateCustomer = async (req: Request, res: Response) => {
  await handler.updateCustomer(req);

  return new StatusOkNoContent(res);
};

export const deleteCustomer = async (req: Request, res: Response) => {
  await handler.deleteCustomer(req);

  return new StatusOkNoContent(res);
};
