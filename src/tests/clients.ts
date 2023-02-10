import type { ObjectId } from "mongoose";

import request from "supertest";
import { testServer as server } from "./conftest";
import { CustomerCreateMock } from "./mock/customers.mock";

const req = request(server);

const data = Object.assign({}, CustomerCreateMock.getData());

const _id: ObjectId = data["_id"].toHexString();

export const TestClient = async (innerFunction: Function) => {
  Promise.all([
    await req.post("/customers").send(data),
    await innerFunction(_id),
    await req.delete(`/customers/${_id}`),
  ]);
};
