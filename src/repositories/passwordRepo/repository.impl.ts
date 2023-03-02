import type { IPwdRepository, PropsUpdate } from "./interface";

import { CustomerModel as model } from "../../models/customers.model";

import { isTrue_or_404 } from "../../handlers/validators/validators";

export class PasswordRepository implements IPwdRepository {
  async findByIdAndUpdate(id: string, data: PropsUpdate): Promise<void> {
    const customer = await model.findByIdAndUpdate(id, data);

    isTrue_or_404(customer, "Customer not found!");
  }

  async findByEmail(email: string) {
    const customer = await model.findOne({ email: email });

    isTrue_or_404(customer, "Customer not found!");

    return customer;
  }
}
