import type { Request, Response } from "express";
import { RespCreate, RespOK, RespOkNoContent } from "../helpers/http.protocols";
import { CustomerHandler } from "./handlers/customer.handler";

const handler = new CustomerHandler();

export const getAllCustomer = async (_req: Request, res: Response) => {
  const customers = await handler.getAll();

  new RespOK(res, customers);
};

export const getIdCustomer = async (req: Request, res: Response) => {
  const customer = await handler.getById(req);

  return new RespOK(res, customer);
};

export const createCustomer = async (req: Request, res: Response) => {
  await handler.create(req);

  new RespCreate(res);
};

export const updateCustomer = async (
  req: Request,
  res: Response,
  sub: string
) => {
  await handler.update(req, sub);

  new RespOkNoContent(res);
};

export const deleteCustomer = async (
  _req: Request,
  res: Response,
  sub: string
) => {
  await handler.delete(sub);

  new RespOkNoContent(res);
};
