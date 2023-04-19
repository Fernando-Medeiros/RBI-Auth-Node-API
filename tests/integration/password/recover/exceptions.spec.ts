import { expect, it, describe } from "vitest";
import { app, secretHeader } from "tests/config/config";

describe("Recover - Password - Exceptions", async () => {
  it("Should return status 404, email not registered", async () => {
    const resp = await app
      .post("/password")
      .set(secretHeader)
      .send({ email: "notFoudEmail@example.com" });

    expect(resp.statusCode).toEqual(404);
    expect(resp.body).toBeTypeOf("object");
  });

  it("should return 400 when sending an invalid email", async () => {
    const resp = await app
      .post("/password")
      .set(secretHeader)
      .send({ email: "invalidEmail.com" });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
