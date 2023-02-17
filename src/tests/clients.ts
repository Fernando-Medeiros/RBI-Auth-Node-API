import request from "supertest";
import { beforeAll, afterAll } from "vitest";
import { testServer as server } from "./conftest";
import { CustomerCreateMock, CustomerUpdateMock } from "./mock/customers.mock";

export const req = request(server);

export class CustomerMock {
  customerData = CustomerCreateMock;
  customerUpdate = CustomerUpdateMock;

  getDataToLogin() {
    return {
      email: this.customerData.getData.email,
      password: this.customerData.getData.password,
    };
  }
  getDataToUpdate() {
    return Object.assign({}, this.customerUpdate.getData);
  }

  getDataToCreate() {
    return Object.assign({}, this.customerData.getData);
  }

  getId(): string {
    return this.customerData.getid;
  }

  async getHashPassword(): Promise<string> {
    return await this.customerData.hashPassword();
  }

  async compareHashPassword(password: string): Promise<boolean> {
    return await this.customerData.compareHashPassword(password);
  }

  async getAccessToken(): Promise<string> {
    const tokens = await req.post("/token").send(this.getDataToLogin());
    return tokens.body.access;
  }

  async getRefreshToken(): Promise<string> {
    const tokens = await req.post("/token").send(this.getDataToLogin());
    return tokens.body.refresh;
  }

  async getAuthorization(scope: string = "access"): Promise<object> {
    const token =
      scope === "access"
        ? await this.getAccessToken()
        : await this.getRefreshToken();

    return { Authorization: `bearer ${token}` };
  }

  beforeAll(): void {
    beforeAll(async () => {
      await req.post("/customers").send(this.getDataToCreate());
    });
  }

  afterAll(): void {
    afterAll(async () => {
      await req
        .delete(`/customers/${this.getId()}`)
        .set(await this.getAuthorization());
    });
  }
}
