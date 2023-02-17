import type { Request, Response } from "express";
import { CustomerHandler } from "./handlers/customer.handler";

const handler = new CustomerHandler();

export const getAllCustomer = async (_req: Request, res: Response) => {
  const result = await handler.getAllCustomer();

  res.status(200).json(result);
};

export const getIdCustomer = async (req: Request, res: Response) => {
  try {
    const result = await handler.getIdCustomer(req);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ detail: `${error}` });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    await handler.createCustomer(req);

    res.status(201).json();
  } catch (error) {
    res.status(400).json({ detail: `${error}` });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    await handler.updateCustomer(req);

    res.status(204).json();
  } catch (error) {
    res.status(400).json({ detail: `${error}` });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await handler.deleteCustomer(req);

    res.status(204).json();
  } catch (error) {
    res.status(400).json({ detail: `${error}` });
  }
};
