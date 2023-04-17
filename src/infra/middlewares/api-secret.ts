import type { NextFunction, Request, Response } from "express";
import { decode } from "@inf/security/token/decode.impl";
import { Unauthorized } from "@src/helpers/http.exceptions";

export const apiSecretMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { API_SECRET_KEY } = process.env;
  const { secret } = req.headers;

  try {
    (await decode<string, string>(String(secret))) != API_SECRET_KEY;
  } catch (err) {
    throw new Unauthorized("Unauthorized access. The api password is invalid!");
  }
  next();
};
