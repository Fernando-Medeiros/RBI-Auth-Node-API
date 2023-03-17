import { beforeAll, afterAll } from "vitest";

import { app } from "./config";

import { dataToNewCustomer } from "@tes/mock/customers.mock";

import { Customer } from "@dom/entities/customer";

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

  async getOneCustomerId(headerAuth: Authorization): Promise<string> {
    const manyCustomers = await app.get("/customers").set(headerAuth);

    const { pubId } = await manyCustomers.body[0];

    return pubId;
  }

  async getAccessToken(scope: "access" | "refresh"): Promise<string> {
    const tokens = await app.post("/token").send(this.getDataToLogin());

    const { access, refresh } = tokens.body;

    return scope === "access" ? access : refresh;
  }

  async getAuthorization(
    scope: "access" | "refresh" = "access"
  ): Promise<Authorization> {
    const token = await this.getAccessToken(scope);

    return { Authorization: `bearer ${token || ""}` };
  }

  beforeAll(): void {
    return beforeAll(async () => {
      await app.post("/customers").send(this.getDataToCreate());
    });
  }

  afterAll(): void {
    return afterAll(async () => {
      await app.delete(`/customers`).set(await this.getAuthorization());
    });
  }
}

type Authorization = {
  Authorization: string;
};
