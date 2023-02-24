import { Router } from "express";
import { access, refresh } from "../controllers/auth.controller";

export const route = Router();

route.post("/token", access);

route.post("/refresh", refresh);
