import { expect, test, describe } from "vitest";
import { CustomerMock, req } from "../../clients";

const mock = new CustomerMock();

describe("Login with accessToken", () => {
  mock.beforeAll();
  mock.afterAll();

  test("Should return an object with the tokens", async () => {
    const resp = await req.post("/token").send(mock.getDataToLogin());

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toHaveProperty("access");
    expect(resp.body).toHaveProperty("refresh");
    expect(resp.body).toHaveProperty("type", "bearer");
  });
});

describe("Testing for errors and exceptions", () => {
  let data1 = mock.getDataToLogin();
  let data2 = mock.getDataToLogin();

  data1.email = "email@example.com";
  data2.password = "@example.com";

  test("Should return 400 when passing invalid or null data", async () => {
    const respNull = await req.post("/token").send();

    const respEmail = await req.post("/token").send(data1);

    const respPwd = await req.post("/token").send(data2);

    expect(respNull.statusCode).toBe(400);
    expect(respNull.body).toBeTypeOf("object");

    expect(respEmail.statusCode).toBe(400);
    expect(respEmail.body).toBeTypeOf("object");

    expect(respPwd.statusCode).toBe(400);
    expect(respPwd.body).toBeTypeOf("object");
  });
});
