import type { Request } from "express";

import { Bcrypt } from "../../security/bcrypt";

import { idIsValid } from "../../validators/auth.validators";
import { isTrue_or_404, isTrue_or_400 } from "../../validators/validators";

import { Customer } from "../../entities/customer";
import { CustomerRepository } from "../../repositories/customer.repository";
import { CustomerRequest } from "../requests/customer.request";

export class CustomerHandler {
  private readonly CRYPT = new Bcrypt();
  private readonly REPO = new CustomerRepository();
  private readonly REQ = new CustomerRequest();

  async getAll() {
    return await this.REPO.find();
  }

  async getById(req: Request) {
    const { id } = req.params;

    idIsValid(id);

    const customer = await this.REPO.findById(String(id));

    isTrue_or_404(customer, "Account does not exist!");

    return customer;
  }

  async create(req: Request) {
    const dataToCreate = this.REQ.createRequest(req);

    const emailExists = await this.REPO.findByEmail(dataToCreate.email);

    isTrue_or_400(!emailExists, "Email already exists");

    const customer = new Customer(dataToCreate);

    customer.setPassword = await this.CRYPT.hash(customer.getPassword);

    await this.REPO.save(customer.getDataToCreate);
  }

  async update(req: Request) {
    const { sub } = req.headers;

    const dataToUpdate = this.REQ.updateRequest(req);

    const customer = await this.REPO.findByIdAndUpdate(
      sub as string,
      dataToUpdate
    );

    isTrue_or_404(customer, "Account does not exist!");
  }

  async delete(req: Request) {
    const { sub } = req.headers;

    const customer = await this.REPO.findByIdAndDelete(sub as string);

    isTrue_or_404(customer, "Account does not exist!");
  }
}
