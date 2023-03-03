import { expect, it, describe } from "vitest";

import { CustomerMock, req } from "@tes/config/clients";

const mock = new CustomerMock();

let headerAuth: { Authorization: string };

describe("Get Header -> Authorization", () => {
  mock.beforeAll();

  it("Should return current session header", async () => {
    headerAuth = await mock.getAuthorization();

    expect(headerAuth).toHaveProperty("Authorization");
  });
});

describe("Update - Password - Ok", () => {
  it("Should return 204 when updating new password", async () => {
    const newPwd = "NewTest@1234";

    const resp = await req
      .patch(`/password`)
      .send({ password: newPwd })
      .set(headerAuth);

    expect(resp.statusCode).toEqual(204);
    expect(resp.body).toBeNull;
  });
});

describe("Update - Password - Exceptions", () => {

  it("Should return 400 when sending password in invalid format", async () => {
    const newPwd = "<Z======Z>";

    const resp = await req
      .patch(`/password`)
      .send({ password: newPwd })
      .set(headerAuth);

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 401 when trying to update the password without authentication in the header", async () => {
    const newPwd = "NNttPWd@@##00";

    const resp = await req
    .patch(`/password`)
    .send({ password: newPwd });

    expect(resp.statusCode).toEqual(401);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 401 when sending invalid token in header", async () => {
    const newPwd = "NNttPWd@@##00";

    const resp = await req
      .patch(`/password`)
      .send({ password: newPwd })
      .set({ Authorization: String(Math.random() * 3) });

    expect(resp.statusCode).toEqual(401);
    expect(resp.body).toBeTypeOf("object");
  });
});
