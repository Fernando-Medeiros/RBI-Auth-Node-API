import { describe, test, expect } from "vitest";
import { Token, PropsToken } from "../../security/token";

const jwt = new Token();

describe("Test expired token and conversion in seconds", () => {
  test("should convert 15 minutes to 900 seconds and compare with the current time", () => {
    const time = jwt.convertToMilliseconds(15);

    expect(time).toBeTypeOf("number");
    expect(time - Math.floor(Date.now() / 1000)).toBeLessThan(time);
  });

  test("Should return expired token error", async () => {
    const newToken = await jwt.createRefresh({
      sub: "ID",
      exp: jwt.convertToMilliseconds(0),
    });

    expect(jwt.decode(newToken)).rejects.toThrowError("jwt expired");
  });
});

describe("Encode and Decode", () => {
  let newToken: string;

  test("Should encode token with sub and exp", async () => {
    newToken = await jwt.encode({
      sub: "123456789",
      exp: jwt.convertToMilliseconds(15),
    });

    expect(newToken).toBeTypeOf("string");
    expect(newToken?.length).toBeGreaterThan(150);
  });

  test("Should decode and check for sub and exp exist", async () => {
    const payload = await jwt.decode(newToken);

    expect(payload).toBeTypeOf("object");
    expect(payload).toHaveProperty("sub");
    expect(payload).toHaveProperty("exp");
  });

  test("Should return error when receiving invalid tokens", () => {
    const iTokens = ["1221212", "", "//@||@\\"];

    for (let iTkn of iTokens) {
      expect(jwt.decode(iTkn)).rejects.toThrowError("jwt");
    }
  });
});

describe("AccessToken", () => {
  let newToken: string;

  test("Create", async () => {
    newToken = await jwt.createAccess({ sub: "ID" });

    expect(newToken).toBeTypeOf("string");
    expect(newToken?.length).toBeGreaterThan(150);
  });

  test("Decode", async () => {
    const payload: PropsToken = await jwt.decode(newToken);

    expect(payload).toBeTypeOf("object");
    expect(payload).toHaveProperty("sub");
    expect(payload).toHaveProperty("exp");
    expect(payload).toHaveProperty("scope", "access");
  });
});

describe("RefreshToken", () => {
  let newToken: string;

  test("Create", async () => {
    newToken = await jwt.createRefresh({ sub: "ID" });

    expect(newToken).toBeTypeOf("string");
    expect(newToken?.length).toBeGreaterThan(150);
  });

  test("Decode", async () => {
    const payload: PropsToken = await jwt.decode(newToken);

    expect(payload).toBeTypeOf("object");
    expect(payload).toHaveProperty("sub");
    expect(payload).toHaveProperty("exp");
    expect(payload).toHaveProperty("scope", "refresh");
  });
});

describe("RecoverToken", () => {
  let newToken: string;

  test("Create", async () => {
    newToken = await jwt.createRecover({ sub: "ID" });

    expect(newToken).toBeTypeOf("string");
    expect(newToken?.length).toBeGreaterThan(150);
  });

  test("Decode", async () => {
    const payload: PropsToken = await jwt.decode(newToken);

    expect(payload).toBeTypeOf("object");
    expect(payload).toHaveProperty("sub");
    expect(payload).toHaveProperty("exp");
    expect(payload).toHaveProperty("scope", "recover");
  });
});