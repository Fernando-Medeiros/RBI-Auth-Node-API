import type { Types } from "mongoose";
import type {
  ICustomerRepository,
  PropsCreate,
  PropsUpdate,
} from "@app/interfaces/repositories/customer.repository.interface";

import { CustomerModel as model } from "@inf/models/customers.model";

import { isTrue_or_404 } from "@app/validators/validators";

export class CustomerRepository implements ICustomerRepository {
  async findByEmail(
    email: string
  ): Promise<{ _id: Types.ObjectId | string } | null> {
    return await model.exists({ email: email });
  }

  async find() {
    return await model.find();
  }

  async findById(id: string) {
    const customer = await model.findById(id);

    isTrue_or_404(customer, "Customer not found!");

    return customer;
  }

  async findByIdAndUpdate(id: string, data: PropsUpdate) {
    const customer = await model.findByIdAndUpdate(id, data);

    isTrue_or_404(customer, "Account does not exist!");

    return customer;
  }

  async findByIdAndDelete(id: string) {
    const customer = await model.findByIdAndRemove(id);

    isTrue_or_404(customer, "Account does not exist!");

    return customer;
  }

  async save(data: PropsCreate) {
    return await model.create(data);
  }
}
