import type {
  PropsCreate,
  PropsUpdate,
} from "../entities/interfaces/customer.interface";
import { CustomerModel } from "../models/customers.model";

export class CustomerRepository {
  async save(data: PropsCreate) {
    return await CustomerModel.create(data);
  }

  async findByEmail(_email: string) {
    return await CustomerModel.exists({ email: _email });
  }

  async find() {
    return await CustomerModel.find();
  }

  async findById(id: string) {
    return await CustomerModel.findById(id);
  }

  async findOne(query: object) {
    return await CustomerModel.findOne(query);
  }

  async findByIdAndUpdate(id: string, data: PropsUpdate) {
    return await CustomerModel.findByIdAndUpdate(id, data);
  }

  async findByIdAndDelete(id: string) {
    return await CustomerModel.findByIdAndRemove(id);
  }
}
