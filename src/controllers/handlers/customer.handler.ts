import type { Request } from "express";

import { Bcrypt } from "../../security/bcrypt";

import { idIsValid } from "../../validators/auth.validators";
import { isTrue_or_400 } from "../../validators/validators";

import { Customer } from "../../entities/customer";
import { CustomerRepository } from "../../repositories/customer.repository";
import { CustomerRequest } from "../requests/customer.request";

export class CustomerHandler {
  private readonly crypt = new Bcrypt();
  private readonly repository = new CustomerRepository();
  private readonly customerRequest = new CustomerRequest();

  async getAll() {
    return await this.repository.find();
  }

  async getById(req: Request) {
    const { id } = req.params;

    idIsValid(id);

    const customer = await this.repository.findById(String(id));

    return customer;
  }

  async create(req: Request) {
    const dataToCreate = this.customerRequest.createRequest(req);

    const emailExists = await this.repository.findByEmail(dataToCreate.email);

    isTrue_or_400(!emailExists, "Email already exists");

    const customer = new Customer(dataToCreate);

    customer.setPassword = await this.crypt.hash(customer.getPassword);

    await this.repository.save(customer.getDataToCreate);
  }

  async update(req: Request) {
    const { sub } = req.headers;

    const dataToUpdate = this.customerRequest.updateRequest(req);

    await this.repository.findByIdAndUpdate(sub as string, dataToUpdate);
  }

  async delete(req: Request) {
    const { sub } = req.headers;

    await this.repository.findByIdAndDelete(sub as string);
  }
}
