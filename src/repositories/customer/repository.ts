import type { ICustomerRepository } from "./repository.interface";
import type {
  PropsCreate,
  PropsUpdate,
} from "../../entities/interfaces/customer.interface";

import { CustomerModel as model } from "../../models/customers.model";
import { isTrue_or_404 } from "../../handlers/validators/validators";

export class CustomerRepository implements ICustomerRepository {
  async findByEmail(email: string) {
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

  async findOne(query: object) {
    const customer = await model.findOne(query);

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
