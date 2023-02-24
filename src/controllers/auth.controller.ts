import type { Request, Response } from "express";
import { RespOK } from "../helpers/http.protocols";
import { AuthHandler } from "./handlers/auth.handler";

const handler = new AuthHandler();

export const access = async (req: Request, res: Response) => {
  const tokenPayload = await handler.access(req);

  new RespOK(res, tokenPayload);
};

export const refresh = async (req: Request, res: Response) => {
  const tokenPayload = await handler.refresh(req);

  new RespOK(res, tokenPayload);
};
