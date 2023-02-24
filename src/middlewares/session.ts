import type { NextFunction, Request, Response } from "express";

import { Token } from "../security/token";
import { subIsValid, tokenIsValid } from "../validators/auth.validators";

const JWT = new Token();

export const sessionMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  const token = authorization?.replace("bearer ", "");

  tokenIsValid(token, "Missing Authorization header with token");

  const { sub } = await JWT.decode(String(token));

  subIsValid(sub);

  req.headers = { sub: sub };

  next();
};
