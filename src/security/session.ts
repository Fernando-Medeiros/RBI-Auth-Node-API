import type { Request, Response } from "express";

import { Token } from "../security/token";
import { subIsValid, tokenIsValid } from "../validators/auth.validators";

const JWT = new Token();

export const session = async (
  req: Request,
  res: Response,
  next: CallableFunction
) => {
  const { authorization } = req.headers;

  const token = authorization?.replace("bearer ", "");

  tokenIsValid(token, "Missing Authorization header with token");

  const sub = await JWT.decode(String(token));

  subIsValid(sub.sub);

  return next(req, res, sub.sub);
};
