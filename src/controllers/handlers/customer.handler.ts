import type { Request } from "express";
import { CustomerModel } from "../../models/customers.model";
import {
  CustomerCreateSchema,
  CustomerUpdateSchema,
} from "../../entities/customer";

export class CustomerHandler {
  async getAllCustomer() {
    return await CustomerModel.find();
  }

  async getIdCustomer(req: Request) {
    const { id } = req.params;

    return await CustomerModel.findById(id);
  }

  async createCustomer(req: Request) {
    const schema = new CustomerCreateSchema(req.body);
    await schema.hashPassword();

    const emailExists = await CustomerModel.exists({
      email: schema.getData.email,
    });

    if (emailExists) {
      throw new Error("Email already in use!");
    }

    return await CustomerModel.create(schema.getData);
  }

  async updateCustomer(req: Request) {
    const { id } = req.params;

    const schema = new CustomerUpdateSchema(req.body);

    if (!schema.validateFields()) {
      throw new Error("No content!");
    }

    return await CustomerModel.findByIdAndUpdate(id, schema.getData);
  }

  async deleteCustomer(req: Request) {
    const { id } = req.params;

    return await CustomerModel.findByIdAndDelete(id);
  }
}
