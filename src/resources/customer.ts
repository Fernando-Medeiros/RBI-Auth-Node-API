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

route.patch("/customers", (req, res) => session(req, res, updateCustomer));

route.delete("/customers", (req, res) => session(req, res, deleteCustomer));
