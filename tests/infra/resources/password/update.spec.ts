import { expect, it, describe, beforeAll } from "vitest";
import { app, secretHeader } from "@tes/config/config";

import { CustomerMock } from "@tes/config/customer";
import { Helpers } from "@tes/config/helpers/insert-customer";
import { authHeader } from "@tes/config/headers/authorization.header";
import { getTokenByScope } from "@tes/config/helpers/get-token-by-scope";

const mock = new CustomerMock();
const headerAuth = { Authorization: "" };

describe("Update - Password - Ok", async () => {
  beforeAll(async () => await Helpers.insertCustomer(mock.dataToCreate));

  it("Get Header and pubId", async () => {
    await authHeader(await getTokenByScope("refresh", mock.dataToLogin)).then(
      (authorizationHeader) => {
        Object.assign(headerAuth, authorizationHeader);
      }
    );
  });

  it("Should return 204 when updating new password", async () => {
    const newPwd = "NewTest@1234";

    const resp = await app
      .patch(`/password`)
      .set({ ...secretHeader, ...headerAuth })
      .send({ password: newPwd });

    expect(resp.statusCode).toEqual(204);
    expect(resp.body).toBeNull;
  });
});

describe("Update - Password - Exceptions", async () => {
  it("Should return 400 when sending password in invalid format", async () => {
    const newPwd = "<Z======Z>";

    const resp = await app
      .patch(`/password`)
      .set({ ...secretHeader, ...headerAuth })
      .send({ password: newPwd });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 401 when trying to update the password without authentication in the header", async () => {
    const newPwd = "NNttPWd@@##00";

    const resp = await app
      .patch(`/password`)
      .set(secretHeader)
      .send({ password: newPwd });

    expect(resp.statusCode).toEqual(401);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 401 when sending invalid token in header", async () => {
    const newPwd = "NNttPWd@@##00";

    const resp = await app
      .patch(`/password`)
      .send({ password: newPwd })
      .set({
        ...secretHeader,
        Authorization: String(Math.random() * 3),
      });

    expect(resp.statusCode).toEqual(401);
    expect(resp.body).toBeTypeOf("object");
  });
});
