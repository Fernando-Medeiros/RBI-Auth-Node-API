import { Router } from "express";
import { access, refresh } from "../auth.controller";

const publicRoute = Router();

export const authRoutes = {
  public() {
    publicRoute.post("/token", access);

    publicRoute.post("/refresh", refresh);

    return publicRoute;
  },
};
