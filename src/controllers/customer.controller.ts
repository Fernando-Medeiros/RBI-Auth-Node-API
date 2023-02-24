import type { Request, Response } from "express";
import { RespCreate, RespOK, RespOkNoContent } from "../helpers/http.protocols";
import { CustomerHandler } from "./handlers/customer.handler";

const handler = new CustomerHandler();

export const getAllCustomer = async (_req: Request, res: Response) => {
  const customers = await handler.getAll();

  return new RespOK(res, customers);
};

export const getIdCustomer = async (req: Request, res: Response) => {
  const customer = await handler.getById(req);

  return new RespOK(res, customer);
};

export const createCustomer = async (req: Request, res: Response) => {
  await handler.create(req);

  return new RespCreate(res);
};

export const updateCustomer = async (req: Request, res: Response) => {
  await handler.update(req);

  return new RespOkNoContent(res);
};

export const deleteCustomer = async (req: Request, res: Response) => {
  await handler.delete(req);

  return new RespOkNoContent(res);
};
