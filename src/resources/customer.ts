import { Router } from "express";
import { session } from "../security/session";
import {
  getAllCustomer,
  getIdCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller";

export const route = Router();

route.get("/customers", (req, res) => session(req, res, getAllCustomer));

route.get("/customers/:id", (req, res) => session(req, res, getIdCustomer));

route.post("/customers", createCustomer);

route.patch("/customers/:id", (req, res) => session(req, res, updateCustomer));

route.delete("/customers/:id", (req, res) => session(req, res, deleteCustomer));

// QUERY
// get all - (filter by) - (limite) - (asc || des)

// get by - (email) - (firstName || lastName)
