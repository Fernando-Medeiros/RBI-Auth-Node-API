import { Router } from "express";
import {
  getAllCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";

export const route = Router();

// BASIC CRUD
route.get("/customers", getAllCustomer);

route.post("/customers", createCustomer);

route.patch("/customers/:id", updateCustomer);

route.delete("/customers/:id", deleteCustomer);

// QUERY
// get all - (filter by) - (limite) - (asc || des)

// get by - (id) - (email) - (firstName || lastName)
