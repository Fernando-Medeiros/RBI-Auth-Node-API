import { Router } from "express";
import { sessionMiddleware } from "../middlewares/session";
import {
  getAllCustomer,
  getIdCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller";

export const route = Router();

route.post("/customers", createCustomer);

route.use(sessionMiddleware);

route.get("/customers", getAllCustomer);

route.get("/customers/:id", getIdCustomer);

route.patch("/customers", updateCustomer);

route.delete("/customers", deleteCustomer);
