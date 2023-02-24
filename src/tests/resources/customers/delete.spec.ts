import { expect, it, describe } from "vitest";
import { CustomerMock, req } from "../../clients";

const mock = new CustomerMock();

describe("Delete - Ok", async () => {
  mock.beforeAll();

  it("Should delete customer with authenticated session", async () => {

    const resp = await req.delete("/customers")
    .set(await mock.getAuthorization());

    expect(resp.statusCode).toBe(204);
    expect(resp.body).toBeNull;
  });

})

describe("Delete - Exceptions", async () => {
  mock.beforeAll();

  it("Should return 401 when trying to delete the same customer twice", async () => {
    
    await req.delete("/customers")
    .set( await mock.getAuthorization());

    const resp = await req.delete("/customers")
    .set(await mock.getAuthorization());

    expect(resp.statusCode).toBe(401);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return unauthorized 401", async () => {
    const resp = await req.delete("/customers");

    expect(resp.statusCode).toBe(401);
  });
});
