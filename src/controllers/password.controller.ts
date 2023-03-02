import type { Request, Response } from "express";
import { StatusOK, StatusOkNoContent } from "../helpers/http.protocols";
import { PasswordHandler as handler } from "../handlers/password.handler";

export const recoverPassword = async (req: Request, res: Response) => {
  const message = await handler.recover(req);

  return new StatusOK(res, message);
};

export const updatePassword = async (req: Request, res: Response) => {
  await handler.update(req);

  return new StatusOkNoContent(res);
};

export const resetPassword = async (req: Request, res: Response) => {
  await handler.reset(req);

  return new StatusOkNoContent(res);
};
