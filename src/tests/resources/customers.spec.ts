import request from "supertest";
import { expect, it, describe } from "vitest";
import { testServer as server } from "../conftest";
import { TestClient } from "../clients";
import { CustomerCreateMock, CustomerUpdateMock } from "../mock/customers.mock";

const req = request(server);

describe("Get", () => {
  it("get all", async () => {
    const resp = await req.get("/customers");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
  });

  it("by id", async () => {
    TestClient(async (id: string) => {
      const resp = await req.get(`/customers/${id}`);

      expect(resp.statusCode).toBe(200);
      expect(resp.body).toBeTypeOf("object");
    });
  });

  it("try get by id", async () => {
    TestClient(async (id: string) => {
      const resp = await req.get(`/customers/${id}1`);

      expect(resp.statusCode).toBe(400);
      expect(resp.body).toBeTypeOf("string");
    });
  });

  // add 401
});

describe("Post", () => {
  it("register new customer", async () => {
    const data = Object.assign({}, CustomerCreateMock.getData());

    const resp = await req.post("/customers").send(data);

    expect(resp.statusCode).toBe(201);
  });

  it("try register new customer with invalid data", async () => {
    const data = Object.assign({}, CustomerCreateMock.getData());

    data["email"] = undefined;

    const resp = await req.post("/customers").send(data);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("string");
  });
});

describe("Patch", () => {
  it("update first and last name", () =>
    TestClient(async (id: string) => {
      const data = Object.assign({}, CustomerUpdateMock.getData());

      data["email"] = undefined;

      const resp = await req.patch(`/customers/${id}`).send(data);

      expect(resp.statusCode).toBe(204);
    }));

  it("update email", () =>
    TestClient(async (id: string) => {
      const data = Object.assign({}, CustomerUpdateMock.getData());

      data["firstName"] = undefined;
      data["lastName"] = undefined;

      const resp = await req.patch(`/customers/${id}`).send(data);

      expect(resp.statusCode).toBe(204);
    }));

  it("try update without content", () =>
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
  it("delete customer", () =>
    TestClient(async (id: string) => {
      const resp = await req.delete(`/customers/${id}`);

      expect(resp.statusCode).toBe(204);
    }));

  it("try deleting the same customer twice", () =>
    TestClient(async (id: string) => {
      await req.delete(`/customers/${id}`);

      const resp = await req.delete(`/customers/${id}`);

      expect(resp.statusCode).toBe(400);
      expect(resp.body).toBeTypeOf("string");
    }));

  it("try delete inexist customer", () =>
    TestClient(async (id: string) => {
      const resp = await req.delete(`/customers/${id}1`);

      expect(resp.statusCode).toBe(400);
      expect(resp.body).toBeTypeOf("string");
    }));

  // add 401
});
