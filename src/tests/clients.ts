import request from "supertest";

import { beforeAll, afterAll } from "vitest";
import { testServer as server } from "./conftest";

import { Customer } from "../entities/customer";
import { dataToNewCustomer } from "./mock/customers.mock";

export const req = request(server);

export class CustomerMock {
  customer: Customer;

  constructor() {
    this.customer = new Customer(dataToNewCustomer);
  }

  getDataToLogin() {
    return {
      email: this.customer.getEmail,
      password: this.customer.getPassword,
    };
  }

  getDataToCreate() {
    return Object.assign({}, this.customer.getDataToCreate);
  }

  async getOneCustomerId(headerAuth: {
    Authorization: string;
  }): Promise<string> {
    const manyCustomers = await req.get("/customers").set(headerAuth);

    const { _id } = manyCustomers.body[0];
    return _id;
  }

  async getAccessToken(): Promise<string> {
    const tokens = await req.post("/token").send(this.getDataToLogin());
    return tokens.body.access;
  }

  async getRefreshToken(): Promise<string> {
    const tokens = await req.post("/token").send(this.getDataToLogin());
    return tokens.body.refresh;
  }

  async getAuthorization(scope = "access"): Promise<{ Authorization: string }> {
    const token =
      scope === "access"
        ? await this.getAccessToken()
        : await this.getRefreshToken();

    return { Authorization: `bearer ${token || ""}` };
  }

  beforeAll(): void {
    beforeAll(async () => {
      await req.post("/customers").send(this.getDataToCreate());
    });
  }

  afterAll(): void {
    afterAll(async () => {
      await req.delete(`/customers`).set(await this.getAuthorization());
    });
  }
}
