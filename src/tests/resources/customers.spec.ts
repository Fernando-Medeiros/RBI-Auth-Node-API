import request from "supertest";
import { expect, test, describe } from "vitest";
import { testServer as server } from "../conftest";
import { TestClient } from "../clients";
import { CustomerCreateMock, CustomerUpdateMock } from "../mock/customers.mock";

const req = request(server);

describe("Post", () => {
  test("register new customer", async () => {
    const data = Object.assign({}, CustomerCreateMock.getData());

    const resp = await req.post("/customers").send(data);

    expect(resp.statusCode).toBe(201);
  });

  test("try register new customer with invalid data", async () => {
    const data = Object.assign({}, CustomerCreateMock.getData());

    data["email"] = undefined;

    const resp = await req.post("/customers").send(data);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("string");
  });
});

describe("Get", () => {
  test("get all", async () => {
    const resp = await req.get("/customers");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
  });

  test("by id", async () => {
    TestClient(async (id: string) => {
      const resp = await req.get(`/customers/${id}`);

      expect(resp.statusCode).toBe(200);
      expect(resp.body).toBeTypeOf("object");
    });
  });

  test("try get by id", async () => {
    TestClient(async (id: string) => {
      const resp = await req.get(`/customers/${id}1`);

      expect(resp.statusCode).toBe(400);
      expect(resp.body).toBeTypeOf("string");
    });
  });

  // add 401
});

describe("Patch", () => {
  test("update first and last name", () =>
    TestClient(async (id: string) => {
      const data = Object.assign({}, CustomerUpdateMock.getData());

      data["email"] = undefined;

      const resp = await req.patch(`/customers/${id}`).send(data);

      expect(resp.statusCode).toBe(204);
    }));

  test("update email", () =>
    TestClient(async (id: string) => {
      const data = Object.assign({}, CustomerUpdateMock.getData());

      data["firstName"] = undefined;
      data["lastName"] = undefined;

      const resp = await req.patch(`/customers/${id}`).send(data);

      expect(resp.statusCode).toBe(204);
    }));

  test("try update without content", () =>
    TestClient(async (id: string) => {
      const data = Object.assign({}, CustomerUpdateMock.getData());

      data["firstName"] = undefined;
      data["lastName"] = undefined;
      data["email"] = undefined;

      const resp = await req.patch(`/customers/${id}`).send(data);

      expect(resp.statusCode).toBe(400);
      expect(resp.body).toBeTypeOf("string");
    }));

  // add 401
});

describe("Delete", () => {
  test("delete customer", () =>
    TestClient(async (id: string) => {
      const resp = await req.delete(`/customers/${id}`);

      expect(resp.statusCode).toBe(204);
    }));

  test("try deleting the same customer twice", () =>
    TestClient(async (id: string) => {
      await req.delete(`/customers/${id}`);

      const resp = await req.delete(`/customers/${id}`);

      expect(resp.statusCode).toBe(400);
      expect(resp.body).toBeTypeOf("string");
    }));

  test("try delete inexist customer", () =>
    TestClient(async (id: string) => {
      const resp = await req.delete(`/customers/${id}1`);

      expect(resp.statusCode).toBe(400);
      expect(resp.body).toBeTypeOf("string");
    }));

  // add 401
});
