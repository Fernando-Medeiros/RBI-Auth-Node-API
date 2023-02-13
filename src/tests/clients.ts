import request from "supertest";
import { beforeAll, afterAll } from "vitest";
import { testServer as server } from "./conftest";
import { CustomerCreateMock, CustomerUpdateMock } from "./mock/customers.mock";

const req = request(server);

export class CustomerMock {
  customerData = CustomerCreateMock;
  customerUpdate = CustomerUpdateMock;

  getDataToUpdate() {
    return Object.assign({}, this.customerUpdate.getData);
  }

  getDataToCreate() {
    return Object.assign({}, this.customerData.getData);
  }

  getId(): string {
    return this.customerData.getid;
  }

  beforeAll(): void {
    beforeAll(async () => {
      const result = await req.post("/customers").send(this.getDataToCreate());
    });
  }

  afterAll(): void {
    afterAll(async () => {
      await req.delete(`/customers/${this.getId()}`);
    });
  }
}
