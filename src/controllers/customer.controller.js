import { CustomerModel } from "../models/customer.model.js";
import {
  CustomerCreateSchema,
  CustomerUpdateSchema,
} from "../models/schemas/customer.schema.js";

export const getAllCustomer = async (req, res) => {
  let result = await CustomerModel.find();

  res.status(200).json(result);
};

export const createCustomer = async (req, res) => {
  try {
    let data = new CustomerCreateSchema(req.body).getValidData();

    await CustomerModel.create(data);

    res.status(201).json();
  } catch (error) {
    res
      .status(400)
      .json({ detail: `Error ao procesar a requisição! ${error}` });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    let id = req.params.id;
    let data = new CustomerUpdateSchema(req.body).getValidData();

    await CustomerModel.findByIdAndUpdate(id, data);

    res.status(204).json();
  } catch (error) {
    res.status(400).json(`Dados invalidos! ${error}`);
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await CustomerModel.findByIdAndRemove(id);

    if (id && result === null) {
      throw new Error();
    }

    res.status(204).json();
  } catch {
    res.status(400).json(`Conta não encontrada!`);
  }
};
