import { Router } from "express";
import {
  getAllCustomer,
  getIdCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller";

export const route = Router();

route.get("/customers", getAllCustomer);

route.get("/customers/:id", getIdCustomer);

route.post("/customers", createCustomer);

route.patch("/customers/:id", updateCustomer);

route.delete("/customers/:id", deleteCustomer);

// QUERY
// get all - (filter by) - (limite) - (asc || des)

// get by - (id) - (email) - (firstName || lastName)
