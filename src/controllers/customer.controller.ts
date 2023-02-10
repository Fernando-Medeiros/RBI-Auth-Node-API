import { CustomerModel } from "../models/customer.model";
import type { Request, Response } from "express";
import {
  CustomerCreateSchema,
  CustomerUpdateSchema,
} from "../models/schemas/customer.schema";

export const getAllCustomer = async (_req: Request, res: Response) => {
  const result = await CustomerModel.find();

  res.status(200).json(result);
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const data = new CustomerCreateSchema(req.body).getData();

    await CustomerModel.create(data);

    res.status(201).json();
  } catch (error) {
    res.status(400).json({ detail: `Error processing the request! ${error}` });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"];
    const data = new CustomerUpdateSchema(req.body).getData();

    await CustomerModel.findByIdAndUpdate(id, data);

    res.status(204).json();
  } catch (error) {
    res.status(400).json(`Invalid data! ${error}`);
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"];
    const result = await CustomerModel.findByIdAndRemove(id);

    if (id && result === null) {
      throw new Error();
    }

    res.status(204).json();
  } catch {
    res.status(400).json(`Account not found!`);
  }
};
