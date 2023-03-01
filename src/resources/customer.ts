import { Router } from "express";
import { sessionMiddleware } from "../middlewares/session";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller";

export const route = Router();

route.post("/customers", createCustomer);

route.use(sessionMiddleware);

route.get("/customers", getAllCustomers);

route.get("/customers/:id", getCustomerById);

route.patch("/customers", updateCustomer);

route.delete("/customers", deleteCustomer);
