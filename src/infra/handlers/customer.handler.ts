import type { Request } from "express";

import { Crypt } from "@inf/security/crypt/crypt.impl";
import { CustomerRepository } from "@inf/repositories/customerRepo/customer.repository.impl";

import { CustomerRequests } from "@app/useCases/customerCase/requests/customer.requests";
import { createCase } from "@app/useCases/customerCase/createCase";
import { deleteCase } from "@app/useCases/customerCase/deleteCase";
import { updateCase } from "@app/useCases/customerCase/updateCase";
import { getAllCase } from "@app/useCases/customerCase/getAllCase";
import { getByIDCase } from "@app/useCases/customerCase/getByIdCase";

export const CustomerHandler = {
  async getAllCustomers() {
    return await getAllCase(
      new CustomerRepository()
      );
  },

  async getCustomerById(req: Request) {
    return await getByIDCase(
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
