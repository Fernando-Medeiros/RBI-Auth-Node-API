import { Router } from "express";
import {
  recoverPassword,
  resetPassword,
  updatePassword,
} from "@inf/controllers/password.controller";

const publicRoute = Router();

const privateRoute = Router();

export const passwordRoutes = {
  public() {
    publicRoute.post("/password", recoverPassword);

    publicRoute.patch("/password/:token", resetPassword);

    return publicRoute;
  },
  private() {
    privateRoute.patch("/password", updatePassword);

    return privateRoute;
  },
};
