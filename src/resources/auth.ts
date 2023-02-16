import { Router } from "express";
import { login, refresh } from "../controllers/auth.controller";

export const route = Router();

route.post("/token", login);

route.post("/refresh", refresh);
