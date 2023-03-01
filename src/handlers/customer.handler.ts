import type { Request } from "express";
import { Crypt } from "../security/crypt/crypt";

import { CustomerRepository } from "../repositories/customer/repository";
import { CustomerRequests } from "./requests/customer/customer.requests";

import { createCase } from "./customerCase/createCase";
import { deleteCase } from "./customerCase/deleteCase";
import { updateCase } from "./customerCase/updateCase";
import { getAllCase } from "./customerCase/getAllCase";
import { getByIDCase } from "./customerCase/getByIdCase";

export const CustomerHandler = {
  async getAllCustomers() {
    return getAllCase(
      new CustomerRepository());
  },

  async getCustomerById(req: Request) {
    return getByIDCase(
      req, 
      new CustomerRepository()
      );
  },

  async createCustomer(req: Request) {
    await createCase(
      req,
      new Crypt(),
      new CustomerRepository(),
      new CustomerRequests()
    );
  },

  async updateCustomer(req: Request) {
    await updateCase(
      req,
      new CustomerRepository(),
      new CustomerRequests()
      );
  },

  async deleteCustomer(req: Request) {
    await deleteCase(
      req,
      new CustomerRepository()
      );
  },
};
