import type {
  IPwdRepository,
  PropsUpdate,
} from "@app/interfaces/repositories/password.repository.interface";

import { CustomerModel as model } from "@inf/models/customers.model";

import { isTrue_or_404 } from "@app/validators/validators";

export class PasswordRepository implements IPwdRepository {
  async findByIdAndUpdate(id: string, data: PropsUpdate): Promise<void> {
    const customer = await model.findOneAndUpdate({ pubId: id }, data);

    isTrue_or_404(customer, "Customer not found!");
  }

  async findByEmail(email: string) {
    const customer = await model.findOne({ email: email });

    isTrue_or_404(customer, "Customer not found!");

    return customer;
  }
}
