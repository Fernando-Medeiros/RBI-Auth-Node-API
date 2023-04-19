import type { Request, Response } from "express";
import { StatusOK } from "utils/http.protocols";
import { AuthHandler as handler } from "infra/handlers/auth.handler";

export const access = async (req: Request, res: Response) => {
  const tokenPayload = await handler.access(req);

  return new StatusOK(res, tokenPayload);
};

export const refresh = async (req: Request, res: Response) => {
  const tokenPayload = await handler.refresh(req);

  return new StatusOK(res, tokenPayload);
};
