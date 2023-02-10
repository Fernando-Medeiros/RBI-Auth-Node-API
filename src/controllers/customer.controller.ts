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

export const getIdCustomer = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"];

    const result = await CustomerModel.findById(id);

    if (!result) {
      throw new Error("Account does not exist!");
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const data = new CustomerCreateSchema(req.body).getData();

    if (!(await CustomerModel.create(data))) {
      throw new Error("Error processing the request!");
    }

    res.status(201).json();
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"];
    const data = new CustomerUpdateSchema(req.body);

    if (!data.validate()) {
      throw new Error("No content!");
    }

    if (!(await CustomerModel.findByIdAndUpdate(id, data.getData()))) {
      throw new Error("Account does not exist!");
    }

    res.status(204).json();
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"];

    if (!(await CustomerModel.findByIdAndRemove(id))) {
      throw new Error("Account not found!");
    }

    res.status(204).json();
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};
