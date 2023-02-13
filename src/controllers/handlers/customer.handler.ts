import type { Request } from "express";
import { CustomerModel } from "../../models/customers.model";
import {
  CustomerCreateSchema,
  CustomerUpdateSchema,
} from "../../schemas/customer.schema";

export class CustomerHandler {
  async getAllCustomer() {
    return await CustomerModel.find();
  }

  async getIdCustomer(req: Request) {
    const id = req.params["id"];

    return await CustomerModel.findById(id);
  }

  async createCustomer(req: Request) {
    const data = new CustomerCreateSchema(req.body).getData;

    const emailExists = await CustomerModel.exists({ email: data.email });

    if (emailExists) {
      throw new Error("Email already in use!");
    }

    return await CustomerModel.create(data);
  }

  async updateCustomer(req: Request) {
    const id = req.params["id"];

    const data = new CustomerUpdateSchema(req.body);

    if (!data.validate()) {
      throw new Error("No content!");
    }

    return await CustomerModel.findByIdAndUpdate(id, data.getData);
  }

  async deleteCustomer(req: Request) {
    const id = req.params["id"];

    return await CustomerModel.findByIdAndDelete(id);
  }
}
