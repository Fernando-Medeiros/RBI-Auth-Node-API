import type { Request } from "express";

import { Bcrypt } from "../../security/bcrypt";

import { idIsValid } from "../../validators/auth.validators";
import { isTrue_or_404, isTrue_or_400 } from "../../validators/validators";

import { Customer } from "../../entities/customer";
import { CustomerRepository } from "../../repositories/customer.repository";
import { CustomerRequest } from "../requests/customer.resquest";

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

    customer.setPassword = await this.CRYPT.hashPassword(customer.getPassword);

    await this.REPO.create(customer.getDataToCreate);
  }

  async update(req: Request, sub: string) {
    const dataToUpdate = this.REQ.updateRequest(req);

    const customer = await this.REPO.findByIdAndUpdate(sub, dataToUpdate);

    isTrue_or_404(customer, "Account does not exist!");
  }

  async delete(sub: string) {
    const customer = await this.REPO.findByIdAndDelete(sub);

    isTrue_or_404(customer, "Account does not exist!");
  }
}
