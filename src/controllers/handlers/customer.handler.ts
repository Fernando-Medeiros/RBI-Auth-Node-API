import type { BooleanExpression } from "mongoose";
import type { Request } from "express";
import { CustomerModel } from "../../models/customers.model";
import {
  CustomerCreateSchema,
  CustomerUpdateSchema,
} from "../../entities/customer";

const throwError = (expression: BooleanExpression, message: string) => {
  if (expression) {
    throw new Error(message);
  }
};

export class CustomerHandler {
  async getAllCustomer() {
    return await CustomerModel.find();
  }

  async getIdCustomer(req: Request) {
    const { id } = req.params;
    const result = await CustomerModel.findById(id);

    throwError(result === null, "Account does not exist!");

    return result;
  }

  async createCustomer(req: Request) {
    const schema = new CustomerCreateSchema(req.body);
    await schema.hashPassword();

    const emailExists = await CustomerModel.exists({
      email: schema.getData.email,
    });

    throwError(emailExists != null, "Email already in use!");

    return await CustomerModel.create(schema.getData);
  }

  async updateCustomer(req: Request) {
    const { id } = req.params;
    const schema = new CustomerUpdateSchema(req.body);

    throwError(schema.validateFields() === false, "No content!");

    const result = await CustomerModel.findByIdAndUpdate(id, schema.getData);

    throwError(result === null, "Account does not exist!");

    return result;
  }

  async deleteCustomer(req: Request) {
    const { id } = req.params;
    const result = await CustomerModel.findByIdAndDelete(id);

    throwError(result === null, "Account not found!");

    return result;
  }
}
